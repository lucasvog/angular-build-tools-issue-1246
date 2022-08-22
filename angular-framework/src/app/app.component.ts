import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-framework';
  constructor(){
    testParentFunctionToCallFromComponent();
  }
}

/**
 * Functions that should be modified
 */
async function testParentFunctionToCallFromComponent(){
 
  await asyncTestFunction();

  try{
    //@ts-ignore
    functionWithDestinctNameToFindInBuild();
  }catch(e){}
  
}

/**
 * Test function that should not produce errors
 * @returns true
 */
async function asyncTestFunction(){
  return true;
}