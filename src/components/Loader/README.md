# Loader

The Loader is a simple file for rendering a piece of content -- image, string, whatever -- and applying and removing a CSS class at a regular rate. It simplifies the creation of a simple loader, which can fade in and out in front of content.

To use, simply declare a Loader with optional throbbing speed (default 1000 milliseconds), as well as any additional classes it should have, and a passed child to render. The component will take care of applying and removing a `loader--off` class, which then triggers whatever simple CSS transition is desired.