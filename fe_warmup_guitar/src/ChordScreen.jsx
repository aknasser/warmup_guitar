import * as React from "react" ;


const ChordScreen = () => {
    
    const [note, set_note] = React.useState("A");
    const [chord, set_chord] = React.useState(6);
    const [timer, set_timer] = React.useState({
        time_typed : "",
        time_confirmed : 10000
    });
    
    let zeWorld;

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
        zeWorld = setTimeout(mysterious_note, timer.time_confirmed);   
        console.log(timer.time_confirmed);
        console.log(zeWorld);
        console.log(random_note + random_chord);
        return zeWorld;   
    };

    // ISSUE : Why this useEffect is called twice ?
    React.useEffect( ( ) => {
        console.log("useMe!");
        mysterious_note();
    }, [])

    // Update the value of timer 
    const update_timer = (event) => {
        set_timer({
            ...timer,
            time_typed : event.target.value
        });
    };

    // Confirm the value of the timer
    const confirm_timer_value = (event) => {
        clearTimeout(zeWorld);
        zeWorld = null;
        event.preventDefault();
        set_timer({
            time_typed : 0,           
            time_confirmed : timer.time_typed 
        })
/*         set_timer({
            ...timer,             
            time_typed : 0, // When the form is sent we resent the time typed.
        }) */
        ;
    }

    React.useEffect( () => {
        console.log(timer);
    }, [timer]);
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
                        <input type="text" value={timer.time_typed} onChange= {update_timer} />
                        <input type="submit" value="Set a new timer" />
                    </form>
                </>
            )}
        </>
    );
};

export default ChordScreen;