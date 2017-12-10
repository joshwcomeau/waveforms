# Current Thinking

### Sine Waves

Right now I'm creating an SVG that connects a bunch of points with lines.

Clearly, Canvas would be better suited to this job, so I should switch to that.

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

===========================

### Wave addition

Because `Waveform` is standalone, presumably I can just overlay multiple of them
in, say, a `WaveformCollection` component?

If each one has a transparent line in complimentary colours, then they'd
converge on the same points and create a new color :0

I need an interpolator that can animate the transition between two lines. This
should be simple, though; I think I'm fine with linear animation (or even tied
to scroll events), so it's just about finding a point x% between A and B.

Maybe this can live in a helper component, `WaveformAddition`:

```
<WaveformAddition
  waves={[
    { shape: 'sine', frequency: 50, offset: 0 },
    { shape: 'sine', frequency: 80, offset: 0 },
  ]}
  progress={0.4}
>
```

In this example, `progress` would be a number between 0 and 1, where `0` means
that there's just N individual waves doing their own thing, 1 means that they've
converged into a single shape, and numbers in-between are partway there.

============================

### Intro page

As we scroll the page, the waveforms and graphs and stuff on the left need to
change.

My initial naive idea was just to say that certain things happen at certain
offsets. At 400px scroll, show the axis. At 700px, show an amplitude control.

The problem is that not all browser windows are the same size. On mobile, we
probably want things to happen at very different positions. And even among
similar-sized computers, different window sizes can make things slightly off.
Plus, zoom text, etc.

So, then I thought I could just have an IntersectionObserver that listens for
when a bit of text enters the viewport, and this can invoke a callback which
updates an enum of possible states (FSM woo!)

This is a better idea, but there are some problems:

1. I don't want the graph to change when the item enters the DOM, I want it to
   change when it's roughly lined up with the item lines up with it. This is
   different on mobile as well.

2. We don't have any indication of progress through a given item. For some of
   our visualizations, we may wish for them to fade from one to another, or
   change over scroll. I believe IntersectionObserver might be able to help with
   this, though?

That first issue can be addressed by changing state not when a new item enters
the bottom of the viewport, but when it exits the top of the viewport. And if we
can track the "intersection amount" as an item leaves, this could work.

For this to work, text containers need to be contiguous. It probably makes sense
to have equal padding above and below each text item.
