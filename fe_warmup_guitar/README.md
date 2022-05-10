# warmup_guitar
A tiny app to learn the guitar notes from the neck to the 12th fret...let's rock!


# What the project does
Every X seconds, the app displays randomly a note to play (for instance Bb) on a given chord (for instance the 5th chord)
X : number of seconds to find the note on your guitar and play it. This value can be changed by the user.


# Why the project is useful
The guitar is a cool instrument but it's not as easy as it seems. 
To build good foundations as a guitarist, it's important to know the notes on your Guitar from the neck to the 12th fret.
A good guitarist must be able to find any notes on any chords at a moment's notice. This knowledge is the key to play solo and master this wonderful instrument.
With this app, I provide an interface to learn these notes in a funny way (learning them by heart and sheer repetition can be boring,right ?)


# How users can get started with the project
To come shortly

# Where users can get help with your project
Send me an email : nassers@nassmassa.com |nassermassadimi@gmail.com

# Who maintains and contributes to the project
It's a me ! Nasser Massadimi :D 

# New Features in the kitchen ?
To be completed


## THE LIFECYCLE OF THIS APP CAN BROKEN INTO THESE STAGES :
 
There are 3 timers:
    TIMER1 - The timer selected by the user 
    TIMER2 - The timer to display the correct answer ==> 5000ms==> Triggered when TIMER1 is elapsed (5000ms before the end of TIMER3). (The user can see the answer during the 5 seconds following the end of TIMER1)
    TIMER3 -  During this the current note is visible. When this timer is over, a new note is displayed  ==> TIMER1 + TIMER2


# STAGE 0 -  Initialisation of the app
        States: 
        note is initialised with a given value  (E)
        note is initialised with a given value  (6)
        Delay is initialised with the default values.
        current_timer is updated with the value of  initial_timer (created with the class Timer). 

# STAGE 1 - Timer1, Timer2, Timer3 are triggered
        The note/chord to play is displayed on the UI
        Because current_timer has changed, a side effect is triggered :
        TIMER1 is triggered (using the method start() of the Timer object).
        TIMER 2 is triggered
        TIMER3 is also triggered.

# STAGE 2 - Timer1 and Timer2 are elapsed
        TIMER2 is over :  The answer is updated with the right_answer. The user can see it on the UI
    
# STAGE 3 - Timer3 is elapsed. A new cycle begins (identical to STAGE1)
        A new note is displayed on the UI.
        The state answer is updated: its new value is "" (the anwser is not displayed yet).
        A new_timer is set. current_timer = new_timer 
            TIMER1 is triggered (using the method start() of the Timer object).
            TIMER 2 is triggered
            TIMER3 is also triggered.

# SPECIAL STAGE  - The user sets a different stage
        - delay.time_to_reply is updated
        - We destroy the current_timer with the method stop() - (encapsule a clearTimeout to kill the ongoing setTimeout function). 
        - A new object Timer is created with the new value of delay.time_to_reply
        - current_timer is updated with this new Object Timer.
        ==> BACK TO STAGE 1 

