# Frontend Mentor - Interactive comments section solution

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

   This is a responsive mobile, tablet and desktop comments UI where users can create, reply, edit, delete, and vote.
   Built with React, Context API, and SCSS with state persisted in localStorage.
   This is my solution to  Frontend Mentor's Interactive Comments Section. I focused on a smooth mobile web behavior, an inline
   composer and a voting model that mirror's Reddit's 3 state logic.

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it. 

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: (https://github.com/natalybarah/interactive-comments-section)
- Live Site URL: (https://natalybarah.github.io/interactive-comments-section)

## My process

 - State management: a CommentsProvider and UserProvider expose the commentTree and current user to the app. All mutations flow through provider 
   functions. (source of truth stays at the top)
 - Voting model: each comment tracks a userVotes map. A user vote's can be -1, 0, +1. Clicking up/down computes delta = newVote - oldVote so the
   score always updates correctly.
 - Inline reply composer (mobile-first): instead of snap to top + global composer. the input renders right under the user's selected comment.
   this avoids layout jumps when the keyboard opens
 - Persistence: on load, the app hydrates from localStorage.  Safe defaults prevent null errors on first renders.


### Built with

- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Sass] (https://sass-lang.com/) 


### What I learned

- Lift state up: do math and data changes in the provider (source of truth), not from child components (which are snapshots). This avoids “one render behind” issues when React batches updates.

- 3-state votes: simpler to model as toggles (old→new) than as raw click math. The delta approach keeps UI and data consistent.

- Recursive tree updates: neat, reusable helpers for find/update/delete across nested replies.

- Mobile UX: Inline composer instead of “scroll & snap” for mobile web; fewer viewport races with the keyboard.

- I learned to use flex basis which was helpful for the element to cover the entire row or column. This one was a new one for me!
    ```scss
    .div{
      flex-basis: 100%
    }


### Continued development
 - I want to implement an accurate time system that reflects the real time the user created a comment.
 - Integrate firebase authentication
 - Migrate to vite and TypeScript


### Useful resources

- [Example resource 1](https://blog.logrocket.com/creating-reusable-pop-up-modal-react/) - This helped me understanding popup modals in react.

## Author

- GitHub - [Nataly Barahona](https://github.com/natalybarah)
- Twitter - [@natalycodes](https://www.twitter.com/natalycodes)
- LinkedIn - [Nataly Barahona](www.linkedin.com/in/nataly-barahona-codes)


