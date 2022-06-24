import {DysisElementCollectorAbstract} from './DysisElementCollectorAbstract';

export class DysisElementCollectorUser implements DysisElementCollectorAbstract {
  collect(source: HTMLElement): Array<Element> {
    let userElements: Array<HTMLAnchorElement> = [];
    const anchorTags: HTMLCollectionOf<HTMLAnchorElement> = document.getElementsByTagName('a');
    for (const anchorTag of anchorTags) {
      userElements.push(anchorTag)
    }
     // Filter anchor elements based on them including the user path pattern as link
    userElements = userElements.filter(element => element.href.match('\/user\/.+'))
    // Filter anchor elements based on them including user name as text in their inner content
    userElements = userElements.filter(element => {
      // Extract username from href of element
      const extractedUsername = DysisElementCollectorUser.getUsernameParamFromPath(element.href)
      // Filter for the element if the said username has been found in the inner HTML of the element, else not
      return (element.innerHTML.includes(extractedUsername))
    })
    // Return found and filtered elements
    return userElements;
  }

  static getUsernameParamFromPath(path: String) {
    if (!path.match('\/user\/.+')) {
      throw Error('Path must be user path with username param ')
    }
    let username = path.replace('https://www.reddit.com/user/', '').slice(0, -1)
    return username;
  }
}