import * as React from "react" ;


const ChordScreen = () => {
    
    const [note, set_note] = React.useState("A");
    const [chord, set_chord] = React.useState(6);
    const [delay, set_delay] = React.useState({
        time_typed : "",            // Updated everytime while the user type a new value for the delay
        time_confirmed : 5000,      // Upadted when the user confirm the new delay
        new_timer : false,          // switch to true when we update the timer. switch back to false when the current_timer has been updated with the new value of delay.time_confirmed
    });
    
    const [current_timer, set_current_timer] = React.useState(null);
    // required to store the current Timer ID.
    // We will use it to identify the timer we need to stop with the stop() method of the class Timer



    // Change the chords in a random way.
    const mysterious_note = () => {
        console.log("I have been called");
        const all_notes = ["A","Ab", "A#", "B", "Bb", "C", "C#", "D", "Db", "D#", "E", "Eb","F", "F#", "G", "Gb", "G#"];
        const all_chords = [6, 5, 4, 3, 2, 1];
        // Choose a random note
        const random_note = all_notes[Math.round(Math.random() * all_notes.length)];
        set_note(random_note);
        // Choose a random chord
        const random_chord = all_chords[Math.round(Math.random() * all_chords.length)];
        set_chord(random_chord);
        console.log(random_note + random_chord);
        // Create a new Timer (will be started in the useEffect (see below))
        const next_timer = new Timer(delay.time_confirmed);
        set_current_timer(next_timer);
    };

    // THE TIMER CONSTRUCTOR - 
    // Everytime x second we create a new object with this constructor
    class Timer {
        constructor(delay) {
            this.delay = delay;
            this.timerId = null;   
        }
        // a function to trigger this timer. When delay is elapsed we tri
        start () {
            this.timerId = setTimeout(mysterious_note, this.delay);  // With timerId we have a way to identify the setTimeout function, we need that to stop the right timer with the method stop()
            console.log(`TimerID(start) : ${this.timerId}`);
            return this.timerId;
        }
        // a function to stop this delay.
        stop () {
            clearTimeout(this.timerId);
            console.log(`We are cancelling this timer : ${this.timerId}`);
        };
    }



// SIDE EFFECTS ()
    // Create the initial timer during the first render
    React.useEffect ( () => {
        let initial_timer = new Timer(delay.time_confirmed);
        set_current_timer(initial_timer);
    }, []);

    // Trigger the current_timer we just set using the method start().
    React.useEffect( () => {
        if (current_timer !== null) {
            console.log(`current Timer : ${JSON.stringify(current_timer)}`);
            current_timer.start();
        }
    }
    , [current_timer]);
    
    // When the user set a new value for the timer, we stop the current timer and set a new one with the updated value for delay.
    React.useEffect( () => {
        console.log(`new delay : ${JSON.stringify(delay)}`);
        if (delay.new_timer) {          // with this conditional we are sure to update the timer if and only if the user explicitly send the form.
            // 1 - We stop the former timer
            current_timer.stop();
            // 2 - We create a new timer with the new value of timer
            let new_timer = new Timer(delay.time_confirmed);
            set_current_timer(new_timer);
            // 3 - We switch the property new_timer to false
            set_delay({
                ...delay,
                new_timer : false,
            })
        }
    }, [delay.time_confirmed]);


    
// HANDLER FUNCTIONS
    // Update the value of delay 
    const update_timer = (event) => {
        set_delay({
            ...delay,
            time_typed : event.target.value
        });
    };

    // Confirm the value of the delay
    const confirm_timer_value = (event) => {        
        event.preventDefault();
        set_delay({
            time_typed : 0,           
            time_confirmed : delay.time_typed,
            new_timer : true, 
        });
    }


    return (
        <>
            {!note || !chord ? (
                <h2>Loading</h2>
            ) : (
                <>
                    <span>{note}</span>
                    <span>{chord}</span>
                    <h5>Adjust the delay</h5>
                    <form onSubmit={confirm_timer_value}>
                        <input type="text" value={delay.time_typed} onChange= {update_timer} />
                        <input type="submit" value="Set a new timer" />
                    </form>
                </>
            )}
        </>
    );
};

export default ChordScreen;