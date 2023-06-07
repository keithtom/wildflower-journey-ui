# API Folder

This folder contains the logic that translates between backend and frontend language.

For example:

| Front-end | Backend |
|-----------|---------|
| Milestone | Process |
| Task      | Step    |

Another example:
The `workflow/steps.js` file has a method `augmentSteps` which massages the API response to be more front-end friendly by adding `assignees` and `completers` to the attributes, because the front-end tends to think in terms of those attributes.  This could also be refactored into the backend API.

We also send parameters in `underscore` but receive them in `camelCase`.
This folder should abstract away the mechanics of the API calls.