import * as React from "react" ;


const ChordScreen = () => {
    
// MAIN VARIABLES

    const all_notes = ["A", "B", "C", "D", "E","F", "G"];
    const all_chords = {
        6 : "E",
        5 : "A",
        4 : "D",
        3 : "G", 
        2 : "B",
        1 : "E", 
    };   


// STATES
    const [note, set_note] = React.useState("E");
    const [chord, set_chord] = React.useState(1);
    const [delay, set_delay] = React.useState({
        time_typed : "",            // Updated everytime while the user type a new value for the delay
        time_confirmed : 5000,      // Upadted when the user confirm the new delay
        new_timer : false,          // switch to true when we update the timer. switch back to false when the current_timer has been updated with the new value of delay.time_confirmed
    });

    // required to store the current Timer ID.
    // We will use it to identify the timer we need to stop with the stop() method of the class Timer
    const [current_timer, set_current_timer] = React.useState(null);
    const [answer, set_answer] = React.useState(); //to display the fret to play to get the note expected (number_of_intervals). 



//CORE FUNCTIONS

    // DISPLAY RANDOM NOTE TO PLAY ON A RANDOM CHORD
    const mysterious_note = () => {
        console.log("I have been called");
        // Choose a random note
        const random_index_note = Math.floor(Math.random() * all_notes.length);
        const random_note = all_notes[random_index_note];
        set_note(random_note);
        // Choose a random chord
        const chords_name = Object.keys(all_chords);
        const random_index_chord = Math.floor(Math.random() * chords_name.length);
        const random_chord_number = chords_name[random_index_chord];
        set_chord(random_chord_number);
        console.log(random_note + random_chord_number);
        // Create a new Timer (will be started in the useEffect (see below))
        const next_timer = new Timer(delay.time_confirmed);
        set_current_timer(next_timer);
    };


// DISPLAY THE RIGHT FRET TO BE PLAYED => The fret where the user should put his/her finger to produce the right note.
    // input : 1 - the number of the chord (1, 2, 3...etc). | 2 - The note to play (A, B, C#...etc),
    // output :  the fret to play on the given chord (a number.)
    const right_fret = (number_of_chord, note_to_play) => {
        let fret_to_play;
        console.log(`INPUT RIGHT_FRET: ${number_of_chord} ${note_to_play}`);
        //a - note_to_play = E   || open_chord_note = 5 ==> We deduce that open_chord_note = A.
        const open_chord_note = all_chords[number_of_chord];  // output expected : an open chord letter (E, A, D, G, B, E)
        // b - Between A and E there is ALWAYS a distance of 7 half-step/ frets (this the meat of the algorithm).
        const chords_grid = {
            A : 0,
            A_sharp : 1,
            Bb : 1,
            B : 2,
            C : 3,
            C_sharp : 4,
            Db : 4,
            D : 5, 
            D_sharp : 6,
            Eb : 6, 
            E : 7,
            F : 8,
            F_sharp : 9,
            Gb : 9,
            G : 10,
            G_sharp : 11,
            Ab : 11,
        }
        // c - the computation of the fret to play
        console.log (`CHORD TO PLAY : ${chords_grid[note_to_play]}`);
        console.log (`CHORD TO PLAY : ${chords_grid[open_chord_note]}`);

        const number_of_intervals = 12;                 // Why 12 ? Because 12 is the total number of interval (remember C_sharp = Db are the same note!). If we count 12 intervals, we get back to the same note. 
        if (chords_grid[note_to_play] > chords_grid[open_chord_note]) {
            // We just need to compute the interval between the 2 chords to know which fret should be played
            fret_to_play = chords_grid[note_to_play] - chords_grid[open_chord_note];
        }else {
            // In that case we need to reach (it makes sense if you write the object chord_grid on a piece of paper and count the interval - try with open_chord_note = G and note_to_play = C for example
            fret_to_play = number_of_intervals - chords_grid[open_chord_note] + chords_grid[note_to_play]; 
        }
        console.log(`FRET TO PLAY : ${fret_to_play}`);
        return fret_to_play;
    };






    // THE TIMER CONSTRUCTOR - 
    // Everytime x second we create a new object with this constructor
    class Timer {
        constructor(delay) {
            this.delay = delay;
            this.timerId = null;   
        }
        // a function to trigger this timer. When delay is elapsed we call mysterious_note().
        start() {
            this.timerId = setTimeout(mysterious_note, this.delay);  // With timerId we have a way to identify the setTimeout function, we need that to stop the right timer with the method stop()
            console.log(`TimerID(start) : ${this.timerId}`);
            return this.timerId;
        }
        // a function to stop this delay.
        stop() {
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

    React.useEffect ( () => {
        set_answer(right_fret(chord, note));
    }, [note, chord])


    
// HANDLER FUNCTIONS
    // Update the value of delay 
    const update_timer = (event) => {
        set_delay({
            ...delay,
            time_typed : event.target.value,
        });
    };

    // Confirm the value of the delay
    const confirm_timer_value = (event) => {        
        event.preventDefault();
        set_delay({
            time_typed : 0,           
            time_confirmed : delay.time_typed * 1000,
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
                    <p>The answer {answer}</p>
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



// TIMER SYNC EXPLANATION : 

