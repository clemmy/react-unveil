import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Unveil from '../src/';
import './ball-spin-clockwise.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './styles.css';

class AsyncComponent extends React.Component {
  static propTypes = {
    onComplete: PropTypes.func,
  };

  state = {
    height: 100,
    complete: false,
  };

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState(
        {
          height: 400,
          complete: true,
        },
        this.props.onComplete
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    return (
      <div
        style={{
          height: this.state.height,
          border: '1px solid #49d7cb',
          background: '#bffcee',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {this.state.complete ? (
          'done async stuff!'
        ) : (
          <div className="la-ball-spin-clockwise la-2x">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        )}
      </div>
    );
  }
}

const RichContent = props => {
  return (
    <div style={{ padding: 6 }}>
      <h1>An Essay I Wrote for Philosophy Class :)</h1>
      {props.withImage ? (
        <img
          width="100%"
          src="https://placeimg.com/720/240/tech"
          onLoad={() => props.notifyResize()}
        />
      ) : null}
      <p>
        One of the greatest philosophical questions is whether or not machines
        can “think”, brought up by Alan Turing almost a century ago. This
        question sparked a lot of controversy, and there have been many
        objections to the validity of Turing’s revised question. One of the
        objections that Turing responds to is “The Argument from Consciousness”.
        In this paper, I will be arguing that this objection does not pose a
        serious threat to Turing’s position on the prospects for thinking
        machines, by strengthening Turing’s own points as well as introducing
        logical flaws with the consciousness argument.
      </p>
      <p>
        The original form of the question was thought to be meaningless by
        Turing: “The original question, 'Can machines think?' I believe to be
        too meaningless to deserve discussion” (Turing, 1950, p.442). The reason
        for this is because the question was too vague and what it means to
        “think” was subjective in nature. In order to make the question more
        meaningful, Turing created an imitation game which he predicted in fifty
        years’ time, “[computers will] play the imitation game so well that an
        average interrogator will not have more than 70 percent [of winning]”
        (Turing, 1950, p.442). The game works as follows: Three participants are
        in separate rooms: the interrogator, a human, and a machine. The
        interrogator gives questions to the human and machine to answer through
        an unbiased communication channel, and must try to determine who the
        machine is from their responses.
      </p>
      <p>
        Now, the argument of consciousness holds that we cannot claim that
        something thinks unless we know that it has conscious experiences. This
        means that it should feel experiences and be aware of its own thoughts.
        Since a machine cannot literally think, but can only simulate thinking
        based on its program, then by the argument of consciousness, a machine
        that passes Turing’s test still cannot think.
      </p>
      <p>
        Turing expected this argument in advance, and published the following
        response: “According to the most extreme form of this view, the only way
        by which one could be sure that a machine thinks is to be the machine
        and to feel oneself thinking” (Turing, 1950, p.446). Turing argues that
        this is an extreme solipsist point of view that makes the communication
        of ideas difficult. For example, agreeing with this argument means that
        you also agree with the argument that the only way to know what a human
        thinks is to be that human. But by that logic, then no human except
        one’s self can be proven to be conscious. Therefore, Turing states that
        we just go with the polite convention that everyone thinks.
      </p>
      <p>
        I argue that Turing’s response is sufficient to dismiss, by itself, any
        threat from the consciousness argument. The reason for this is because
        his response makes it illogical for one to argue against the
        consciousness of machines, but not against the consciousness of humans:
        If the only person whose thoughts you can access are your own, then how
        can you prove that other people think. Some people, however, will argue
        that there is a difference between this theory for humans and for
        machines. Since an individual is human and can experience their own
        consciousness, then one can conclude that other humans do as well.
        However, this doesn’t translate over to machines. In order to address
        this argument, I argue that whether machines can actually think are not
        is an unimportant question. The only thing that matters is the behaviour
        it exudes and whether we believe that it is thinking. Suppose a machine
        can successfully simulate a human brain, then its decisions cannot be
        differentiated from a human who is substituted in with the machine. This
        is inline with the convention that all humans are conscious. Since we
        have no way of proving whether or not a human thinks, we conclude that
        they do based on their actions, and so we should with machines.
      </p>
      <p>
        Another perspective on consciousness is to be awake and aware of one’s
        surrounding. If we think about what it is that gives humans
        consciousness, then it can be attributed to our brains. Our brains have
        a schema of knowledge, and in response to its stimuli and environment,
        it formulates decisions through its neurological decision tree. If we
        think about minds as that way, then it follows that machines with
        artificial intelligence must also be conscious, for their simulation of
        thinking is also powered by “machine-brains” known as neural networks
        and deep learning models. Some skeptics may claim that machines are only
        following instructions that are given to them by their respective
        programs, but I think that argument can be challenged by considering the
        instructions that we, humans, are following. The theory is that we have
        some a ton of neurons in our brains and decision paths that happen when
        we make our decisions, but this is a relatively unknown area. For
        example, we are not currently at a stage where we can completely dismiss
        theological viewpoints such as humans being created by a high entity. As
        such, it’s futile effort to argue whether a machine has consciousness
        since there’s currently no way of proving either standpoint.
      </p>
      <p>
        With the current knowledge of humankind, it’s a wasted effort to try to
        argue about the consciousness of machines. If machines can sufficiently
        imitate the human intelligence, then they should be treated as if they
        are intelligent, and can “think”. That’s the assumption we currently
        make for other humans, and it’s logical enough that it should not be
        limited to only humans.
      </p>
    </div>
  );
};

storiesOf('React Unveil', module)
  .add('with default configuration', () => {
    return (
      <Unveil
        render={notifyResize => (
          <RichContent notifyResize={notifyResize} withImage />
        )}
      />
    );
  })
  .add('with async children', () => (
    <Unveil
      render={notifyResize => (
        <AsyncComponent onComplete={() => notifyResize()} />
      )}
    />
  ))
  .add('with children shorter than maxHeight', () => (
    <Unveil
      render={() => (
        <React.Fragment>
          Hello World!
          <ul>
            <li>I'm</li>
            <li>shorter</li>
            <li>than</li>
            <li>default</li>
            <li>maxHeight</li>
            <li>of</li>
            <li>300px</li>
          </ul>
        </React.Fragment>
      )}
    />
  ))
  .add('with custom show more and show less components', () => {
    const renderMore = expand => (
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          padding: 8,
        }}
      >
        <button
          type="button"
          className="btn btn-primary"
          style={{
            width: '100%',
          }}
          onClick={expand}
        >
          Show More
        </button>
      </div>
    );

    const renderLess = collapse => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          padding: 8,
        }}
      >
        <button
          type="button"
          className="btn btn-secondary"
          style={{
            width: '100%',
          }}
          onClick={collapse}
        >
          Show Less
        </button>
      </div>
    );

    return (
      <Unveil
        more={renderMore}
        less={renderLess}
        render={notifyResize => (
          <RichContent notifyResize={notifyResize} withImage />
        )}
      />
    );
  })
  .add('with custom styles', () => (
    <Unveil
      style={{
        border: '1px solid blue',
        padding: 4,
      }}
      render={notifyResize => (
        <RichContent notifyResize={notifyResize} withImage />
      )}
    />
  ))
  .add('with initially expanded state', () => (
    <Unveil
      render={notifyResize => (
        <RichContent notifyResize={notifyResize} withImage />
      )}
      expanded
    />
  ))
  .add('with callbacks', () => (
    <Unveil
      render={notifyResize => (
        <RichContent notifyResize={notifyResize} withImage />
      )}
      onMoreClick={() => alert('Clicked more!')}
      onLessClick={() => alert('Clicked less!')}
    />
  ))
  .add('without show less button', () => (
    <Unveil
      render={notifyResize => (
        <RichContent notifyResize={notifyResize} withImage />
      )}
      less={() => <div />}
    />
  ));
