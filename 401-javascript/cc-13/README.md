# Binary searching
<!-- Description of the challenge -->
Write a function that takes in a string and determines if its coding-relevant brackets are in pairs and are ordered correctly.

## Whiteboard Process

![whiteboard](whiteboard-cc13.png)

## Approach & Efficiency
<!-- What approach did you take? Discuss Why. What is the Big O space/time for this approach? -->

Looking back after the fact, my approach is incorrect. I should have been using a stack style approach, but I will explain my own thinking and my solution.

My approach was similar to 'reversing a linked list' in that I split the string into two arrays, filtering out extra text, being an array of left facing brackets and an array of right facing brackets. Flip the left facing brackets to face right, then compare. Whether the two arrays are equal determines if all brackets have partners and are in the correct order in all cases except one, which is where my code fails and a stack format might not. '({)}' fails for me because every bracket has its partner, and every bracket is in the order it needs to be relative to other brackets of its kind.
