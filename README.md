# My Frontend Projects

Welcome to my repository, where you can find various frontend projects I've created. Each project resides in its own branch, and here you'll find brief descriptions and links to project deployments.

## Self-introduction video - [link](https://www.youtube.com/watch?v=ORIHxrbUlT0)

## Project 1: 'Shelter'

**Overview:**
"Shelter" is a responsive and interactive website project, consisting of a main page and a pets page, designed for an animal shelter.

**Key Skills:**
1. Valid semantic responsive web development.
2. Maintainable and readable code.
3. Importing styles and graphics from Figma.
4. JavaScript for adding functionality.

**Project Details:**

- **Figma Design:** [Link to Figma Design](https://www.figma.com/file/Yk6EnbY63FyG2PJTFkJDMh/shelter?type=design&node-id=94-43&mode=design&t=X5A0JFH7cDla0GTh-0)

- **Deployment:** [Link to Deployment](https://vikalubenets.github.io/frontend-projects/shelter/pages/main/index.html#!)

- **Code Repository:** [Link to Code](https://github.com/VikaLubenets/frontend-projects/tree/shelter-part3)

**Work Summary:**
The project involved creating a responsive and interactive website for an animal shelter. This included valid and semantic web development, importing styles and graphics from Figma, and adding interactivity using JavaScript. The website consists of a main page and a pets page, providing information about animals and ensuring a user-friendly experience on various devices.



## Project 2: 'RSS Minesweeper'

**Overview:**
"RSS Minesweeper" is an implementation of the classic game Minesweeper. In this game, players explore a grid of cells, some of which may contain hidden mines. The objective is to reveal all cells that do not contain mines while avoiding clicking on any mined cell.

**Project Details:**

- **Deployment:** [Link to Deployment](https://rolling-scopes-school.github.io/vikalubenets-JSFE2023Q1/minesweeper/src/index.html)

- **Code Repository:** [Link to Code](https://github.com/VikaLubenets/frontend-projects/tree/minesweeper)

**Game Rules:**
- The game board consists of cells that can be in one of three states: unopened, opened, or flagged.
- An unopened cell is clickable, while an opened cell is exposed.
- Flagged cells are used to mark potential mine locations.
- Players click on cells to reveal them. If a mined cell is opened, the game ends in a loss.
- Opened cells display either a number, indicating nearby mines, or a blank tile.
- Players can flag cells to indicate suspected mine locations.

**Main Functional Requirements**

**Basic (Required):**
- The HTML `index.html` file initially contains only an empty body (with only a script tag allowed), and all necessary elements are generated using JavaScript.
- The game design is adaptive (or responsive) for a width of 500px and above.
- The default game board size is 10x10 with 10 mines.
- Players can click on cells to reveal them. Mines end the game (loss), and numbers indicate adjacent mines.
- The game ends when all non-mined cells are revealed (win) or a mine is clicked (loss), with appropriate messages displayed.

**Advanced:**
- Mines are placed after the first move, preventing immediate loss.
- Players can flag cells to mark suspected mine locations.
- Color coding (using numbers and colors) indicates the number of surrounding mines.
- The game can be restarted without reloading the page (e.g., a "New game" button).
- Display game duration in seconds and the number of clicks.
- Empty squares open adjacent squares until reaching numbered squares.

**Additional:**
- Implement sound effects for game events (e.g., revealing a cell, flagging a cell, game over).
- Offer difficulty levels (easy, medium, hard) that adjust the game board size and mine count.
- Maintain a high score table for the latest 10 results.
- Save game progress using localStorage, allowing players to continue from where they left off.
- Support dark/light themes for the game.
- Recommended usage of eslint (eslint-config-airbnb-base) and webpack (not checked).

**Outcome:**
RSS Minesweeper is a fully functional implementation of the classic Minesweeper game. It offers a challenging gaming experience with various features and customization options.

## Project 3: 'RS Selectors'

**Overview:**
In the "RS Selectors" project, we have created a CSS selectors trainer. This trainer comprises multiple gaming levels, each with a layout example and HTML code corresponding to that level. Some layout elements are highlighted using animations. The user's task is to write CSS selectors that target all the highlighted layout elements.

**Project Details:**

- **Deployment:** [Link to Deployment](https://rolling-scopes-school.github.io/vikalubenets-JSFE2023Q1/RSS-CSS-Selectors/)

- **Code Repository:** [Link to Code](https://github.com/VikaLubenets/frontend-projects/tree/RSS-CSS-Selectors)

**Project Structure**

1. Layout Example: This represents a table with dishes and food items on the original website. You can design and use your own layout variation.
2. User Input Area: A space for users to input their CSS selectors.
3. HTML Code: Hovering over a code fragment highlights the corresponding layout element, and hovering over a layout element highlights the corresponding code fragment. HTML code for each element is displayed nearby.
4. Game Level List: The original website has 32 levels, but completing 10-20 levels is sufficient. Additional levels can be implemented based on availability.

**Key Skills:**
1. TypeScript
2. Modules
3. Webpack

**How the App Works:**
- Users can type and submit a CSS selector in the input area that targets all the highlighted layout elements. They can submit the code by clicking the "Enter" button in the input area or by pressing the "Enter" key on the keyboard (both methods should work).
- Correct and incorrect answers trigger corresponding animations. In the original app, correct answers make highlighted elements fly off the screen, while incorrect answers cause the code window to shake. You can use alternative animations that you find more appropriate and engaging.
- Upon a correct answer, users move on to the next game level, or a victory notification is displayed if it's the last level.
- The app includes a "Help" button for users who can't guess the correct selector. Clicking the "Help" button displays the correct selector in the input area with a typing effect (text appearing letter by letter).
- In the game level list, users can navigate to specific levels by clicking their numbers. Each level shows whether it's completed, not completed, or completed with hints. The current level is highlighted. The app remembers the current level even after a page reload. There's also a button to reset progress and start the game from scratch.

**Outcome:**
The "RS Selectors" project is a CSS selectors training application that replicates the gaming part of the CSS Diner application. Users can practice and improve their CSS selector skills through a fun and interactive experience.


## Getting Started

To view the code of a specific project, navigate to the corresponding branch using the links above. To explore the functionality of a project, follow the deployment link.

## Contact

If you have any questions or comments about the projects or potential collaborations, please feel free to [get in touch](your email address or other contact information).

Thank you for your interest in my projects!