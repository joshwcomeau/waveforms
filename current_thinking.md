# Current Thinking

### Sine Waves

Right now I'm creating an SVG that connects a bunch of points with lines.

I thought about using bezier curves to ensure that the waveforms peak properly
at high frequency, but because the waveforms move, that seems like an awful lot
of trouble. A much cooler idea is to _generate_ the waveform using Web Audio,
and getting the point data from that!

I can just limit the frequency range to a number that doesn't look terrible;
there's no reason that it needs to run at extremely high frequency (I can still
get it pretty tight with the connect-the-dots method).

There might even be a way around it; to ensure that the top of the peak at high
frequency is at the max amplitude for the waveform?

Check out how React Music's visualizer works. I need something like that
