- Global, Range, Size: They should have a Expand all/ collapse all a the top. 
- when clicking iomage, infinite loop of fuckups

1. IMAGE MANIPULATIOON
You need to solve a specific "design or interaction problem" regarding how users manipulate elements like images within a frame.
• Visualise the Origin Point: Create a visual indicator (such as a crosshair) at the "zero point" or origin of the wrapper so users can see how an image is offset from the centre.
• Positioning Controls: Ensure the scale slider is in a fixed position (e.g., underneath the centre) rather than being absolute to the container.
• Reset Functionality: Implement a way to "reset to zero" for both X and Y offsets, especially for cases where an image has been dragged off-screen.
• Overflow Toggle: Add an option to toggle "overflow hidden" on or off. This allows users to see parts of an image that exceed the frame boundaries during the design process, even if they are hidden in the final production export.

2. Property Pane & "Overrides Map" Overhaul
The current system of using multiple tabs (Globals, Ranges, and Sizes) was described as "overwhelming" for non-technical marketing users.
• Single Pane Cascade: Move away from multiple tabs towards a single pane of properties that uses a "cascade" or "editing mode".
• Selective Visibility: Instead of showing every property three times, modify the "Ranges" and "Sizes" views to only show active overrides. If a property isn't being overridden at that level, it should not be shown prominently.
• Mode Selection: Implement a way for users to choose if their edits apply to the current size only, a range, or globally, rather than having to jump between tabs to perform different types of work.

3. Breakpoints and Ranges Interface
You need to redesign the range-editing interface to be more intuitive and less "detached" from the actual creative work.
• Horizontal Linear Interface: Create a horizontal, linear control at the top of the interface that shows all available sizes (referred to as "break points").
• Interactive Highlighting: When a user hovers over a range, the interface should highlight all the specific sizes that fall within that range.
• Direct Manipulation: Allow users to drag the start and end points of these ranges to extend or reduce them across the sizes.
4. Technical and Administrative Tasks
• GitHub Repository: You need to put your current work on GitHub so James can review how you have put the styles and markup together.
• Svelte Integration: Continue working on integrating the front-end functionality into the Svelte app environment, ensuring that interactions are handled correctly with standard JavaScript.
• Invoicing: You are encouraged to invoice for the time you have spent on the project up to this current stage.
