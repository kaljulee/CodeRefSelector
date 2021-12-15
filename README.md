)# CodeRefSelector
HTML/CSS/JavaScript for FileMaker Project

## What Is This?
This is code for a FileMaker web viewer object.  It is part of a larger project to make a FileMaker tool more user-friendly.  
The tool as I found it had a number of aspects that could use improvement, both in the "front-end" and "back-end".
Most of my UI work has been with the React framework, so it has been an interesting challenge to make an interactive document with just HTML/CSS/JS.

### Initial Assessment
The front-end layout I found had some meaningful UI issues.  The smallest and most obvious was that the vertical spacing of the text didn't match up with the alternating-row background colors.
More painfully, the order in which you interacted with the checkboxes and corresponding fields was important.  That is, the checkbox/field pairs on each row are not actually connected in the data.  The first box you check is associated with the first field you fill out, and so-on.  This is not immediately apparent if you fill in the form from top to bottom and make no mistakes, but that doesn't describe how most humans use forms.

### The back-end
Fixing this required a re-structuring of the underlying tables.  The same data was being stored in multiple places in multiple tables, and the data itself was regularly used as the primary key when linking tables.  I untangled and normalized the data with the addition of a bunch more tables, and changed (almost) all the tables to use primary keys independent of the data.

### The Front-end
The checkbox behavior was important to the user,and I had a very difficult time implementing it in FileMaker.  Eventually I gave up wrestling with FileMaker checkboxes and switched to using a web viewer object for the list of checkboxes and fields.  I am much more at home with web dev stuff, so this was a welcome change.  Through a combination of FileMaker scripts and JavaScript functions, the list can be used to update the relevant tables.  

### Next Step
The data needs to exportable into printable reports.  The static nature of printed reports means scrollable lists aren't an option, making the layout more complicated.  I tried a variety of FileMaker solutions, but am planning on using another web viewer object to create the reports.
