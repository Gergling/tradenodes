12a-mean
========

What am I looking at?
---------------------

Development of a multiplayer turn-based game. In space!

### Looking for Crew ###
5 real people on board a ship, performing different duties:
- Chief Tactician: Controls the tactical aspects of running the ship, including space combat, repelling boarding parties or boarding other ships.
- Chief of Intelligence: Scans space for mysteries and potential tactical issues, or just anything interesting.
- Chief Medical Officer: Heals injured or troubled crew members.
- Chief Engineer: Optimises and fixes the ship.
- Chief Navigator: Takes you to exciting new places.

Each of them can provide certain kinds of 'buff':
- Tactical: Enemies can force your crew to steer tactically and slow you down and force your crew to work harder. The Chief Tactician can either reduce this for a couple of days by advising the crew on the forseeable future, or remove such a debuff outright by blowing the offending vessel into the next universe.
- Intelligence: Knowledge of the surrounding area, general scanner optimisations or direct scanner feeds can keep the whole crew up to date on a wide variety of things which may relevant to them. Fixing the engines? Did you know the area you're flying through has a high density of rich colombian dark matter? Best configure the engines appropriately.
- Medical: The crew can be injured during difficult times. Sure, hardly anyone dies anymore, because this is the future, and what are we? Cave-men? They will naturally heal eventually, but the medic could get them up and back to work much faster than that. Furthermore, they can put crew members in a better frame of mind with short therapy sessions. Or drugs. Whatever.
- Engineer: Anything mechanical can be made to run a bit better. Weapons, shields, medical equipment, engines, scanners, the coffee machines. Anything.
- Navigator: If you're on a space ship, the chances are you're going to want to go somewhere at some point. The Navigator will stack up a list of planets visited. If your ship has been there in the last two days, that means you can complete your official or *ahem* private missions or trade transactions. Without them, everyone can find something to do, but it's just not the same...

Why would you do this?
----------------------

For a long time I have wanted to make a multiplayer game. I wanted to include combat, an economy and spaceships, because spaceships are cool.

I also wanted other game mechanics, such as hacking, stealth, engineering, research, manufacturing and resource gathering, because those things are also cool.

I decided that the easiest approach was to abuse turn-based combat mechanics to express other kinds of potentially complex minigames, such as fixing the engines, scanning for enemies, hacking enemy vessels, and of course shooting other ships.

For that purpose I will build a turn-based engine suitable to switching between these contexts and containing the mechanic above. This will have it's own module, and the potential for export as it's own public node package if completed.

Ok? What now?
-------------

Download and install the source code:

- Download/checkout
- Install node
- Run 'make'. This runs 'npm install', which builds the (mostly back-end) vendor packages.
- Run 'grunt'. This downloads more packages and builds the remaining (mostly front-end) vendor packages, using bower.

The software should now be ready to run.

To run it:

- Start a new command line (cmd.bat will do this for you in windows) and run 'mongo'.
- Start another new command line and run 'node server.js'. This will need to be restarted everytime you make changes to the node code.
- Start yet another new command line and run 'grunt watch'. This will update you with snarky, mechanical remarks about how your code looks funny and breaks unit tests.

What the-? I don't even-
------------------------

Correct. Either I haven't bothered to tell you something, or I don't understand it either. Ask me about it. At the very worst I will never get back to you, but it's more likely I'll give you a long rambling response in a flak-cannon approach to answering your question. That is, I will turn up with a flak cannon and right click.

Some might consider that to be almost (*sunglasses*) Unreal! :O
