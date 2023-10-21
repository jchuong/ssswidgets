# Split Data

This folder contains the JSON files for Splits. See `example.json` for the expected structure for the file.

By placing a JSON in this directory, you can navigate to `localhost/split/{filename}` and control the split list. You can confirm this by the listing in `localhost/split`.

## Options

useTime: boolean - show the timer for each split

useAttempts: boolean - show counter for attempts

splits:

- title: title to show
- time: accumulated ms on this segment
- attempts: number of attempts at this segment
- active: boolean is this the current segment
