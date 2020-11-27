
Mouse move listener on main window checks whether mouse coords are within overlay content area, i.e 
black square at x: 10-110px, y: 10-110px.
Then enables mouse events for overlay via ipc.
Overlay has event listener for when mouse overs container for overlay content, in this case the body tag.
This disables mouse events for the overlay.

This works fine for windows, but on mac, the mousemove listener on overlay only fires if the mouse button is held down.
