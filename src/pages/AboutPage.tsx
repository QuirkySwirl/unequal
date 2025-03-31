import React from 'react';
import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="container px-4 py-8 mx-auto prose prose-indigo sm:px-6 lg:px-8 max-w-none">
      <h1>So, What's This All About Then?</h1>

      <p>
        Ever stared at your bank account, then looked at the news about billionaires buying *another* private island (or maybe a social media platform?), and thought, "Wait, how much money is that *really*?"
      </p>

      <p>
        Yeah, us too.
      </p>

      <p>
        Turns out, numbers like "billions" and "trillions" are so big they kinda break our brains. We lose all sense of scale. Is a billion dollars enough to buy a lifetime supply of pizza? (Spoiler: Yes. Many, many lifetimes.) Is it enough to solve world hunger? (Spoiler: It'd make a *massive* dent.)
      </p>

      <p>
        This little app is our attempt to wrap our heads around these astronomical sums. It's a digital playground (hence the name!) where you can:
      </p>
      <ul>
        <li>See just how ridiculously far a billionaire's fortune could stretch.</li>
        <li>Compare that wealth to things like country GDPs or the cost of solving global problems.</li>
        <li>Marvel (or weep) at the sheer absurdity of it all through fun, slightly mind-bending comparisons.</li>
      </ul>

      <h2>Why Though?</h2>
      <p>
        Good question! Mostly curiosity. Partly because visualizing data can be powerful (and sometimes hilarious). And maybe, just maybe, putting these numbers into perspective helps spark conversations about wealth, inequality, and what we value as a society.
      </p>
      <p>
        Or maybe we just wanted an excuse to calculate how many rubber ducks Jeff Bezos could buy. (It's a lot. Like, *a lot* a lot.)
      </p>

      <h2>Is This Serious? Is it Accurate?</h2>
      <p>
        It's seriously built, but presented with a light heart. We try our best to use up-to-date, publicly available data (like from Forbes, World Bank, UN estimates, etc.). However, net worths fluctuate wildly, calculation methods vary, and estimating the cost of "solving" global issues is complex.
      </p>
      <p>
        So, treat this as an engaging thought experiment, not a PhD thesis. The goal is perspective and conversation, not perfect financial accounting down to the last penny (or billion dollars).
      </p>

      <h2>Who Made This?</h2>
      <p>
        Just some folks who like coding, data viz, and pondering the universe's weirdness (including economic weirdness). This is an open-source project, built for fun and learning. Check out the code, suggest improvements, or just play around!
      </p>

      <p className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700">
          Okay, take me back to the playground!
        </Link>
      </p>
    </div>
  );
}
