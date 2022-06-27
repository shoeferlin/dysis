// TODO: content script

import {DysisUsage} from './DysisUsage';
import {DysisAbstract} from './DysisAbstract';
import {DysisReddit} from './DysisReddit';

class Dysis {
  usage: DysisUsage;
  reddit: DysisAbstract;

  constructor() {
    console.log('Dysis App started ...')
    this.usage = new DysisUsage();
    this.reddit = new DysisReddit(document.body);
    this.update();
  }
  
  update() {
    console.log('Init update')
    this.reddit.update();

    setTimeout(
      this.initMutationObserver,
      1_000,
    )

    setTimeout(
      this.initIntersectionObserver,
      1_000,
    )
  }

  initMutationObserver() {
    const config = {
      attributes: true,
      childList: true,
      subtree: true,
    };

    // Debug function to display mutations in console
    const displayMutation = function (mutation: MutationRecord) {
      if (mutation.type === 'childList') {
        console.log('A child node has been added or removed.');
      }
      else if (mutation.type === 'attributes') {
          console.log('A ' + mutation.attributeName + ' attribute was modified.');
      }
      console.log(mutation)
    }

    // Callback function to execute when mutations are observed
    
   
    const mutationObserver = new MutationObserver(Dysis.mutationCallback);

    // Start observing the target node for configured mutations
    mutationObserver.observe(document.body, config);
  }

  static mutationCallback (mutationList: any, observer: any) {
    for (const mutation of mutationList) {
      // displayMutation(mutation);

      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        console.log(mutation);
        for (const addedNode of mutation.addedNodes) {
          console.log(addedNode);
          const anchorTags = addedNode.getElementsByTagName('a');
          for (const a of anchorTags) {
            if (a.href.includes('/user/')) {
              console.log('FOUND ONE')
              console.log(a)
              const x = document.createElement('span');
              x.innerText = 'TESSTTT'
              a.appendChild(x);
            }
          }
          // console.log(addedNode.includes('<a>') && addedNode.includes('/user/'))
        }
      }
    }
  };

  initIntersectionObserver() {
    console.log('Init observer');
    let options = {
      root: null,
      rootMargin: '-20px',
      threshold: 1.0
    }
    function myCallback () {
      console.log('I am in the viewport')
    }
    
    const x = document.body.getElementsByTagName('a');
    console.log(x[55]);
    let observer = new IntersectionObserver(
      myCallback,  
      options
    );
    observer.observe(x[55]);
  }
}

const dysis: Dysis = new Dysis();

