# API Folder

This folder contains the logic that translates between backend and frontend language.

For example:

| Front-end | Backend |
|-----------|---------|
| Milestone | Process |
| Task      | Step    |


We also send parameters in `underscore` but receive them in `camelCase`.
This folder should abstract away the mechanics of the API calls.