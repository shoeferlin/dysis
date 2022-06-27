import {DysisAbstract} from './DysisAbstract';

export class DysisReddit implements DysisAbstract {
  source: HTMLElement;
  collection: Array<Element>;

  constructor(source: HTMLElement) {
    this.source = source;
  }

  update() {

  }

  private collect() {
    let userElements: Array<HTMLAnchorElement> = [];
    const allAnchorTags: HTMLCollectionOf<HTMLAnchorElement> = document.getElementsByTagName('a');
    userElements = Array.from(allAnchorTags);
     // Filter anchor elements based on them including the user path pattern as link
    userElements = userElements.filter(element => element.href.match('\/user\/.+'))
    // Filter anchor elements based on them including user name as text in their inner content
    userElements = userElements.filter(element => {
      // Extract username from href of element
      const extractedUsername = DysisReddit.getUsernameParamFromPath(element.href)
      // Filter for the element if the said username has been found in the inner HTML of the element, else not
      return (element.innerHTML.includes(extractedUsername))
    })
    this.collection = userElements;
  }
  
  handle() {
    this.collect();
    for (const element of this.collection) {
      element.className = 'dysis';
      element.setAttribute('style', 'color: red !important')
    }
  }
  
  getCollection(): Array<Element> {
    return this.collection;
  }

  static getUsernameParamFromPath(path: String) {
    if (!path.match('\/user\/.+')) {
      throw Error('Path must be user path with username param ')
    }
    let username = path.replace('https://www.reddit.com/user/', '').slice(0, -1)
    return username;
  }
}