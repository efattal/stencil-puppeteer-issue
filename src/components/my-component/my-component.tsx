import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'my-component',
  shadow: true
})
export class MyComponent {
  @State() employees = [];

  render() {
    return (
      <div>
        <p><button onClick={() => this.loadData()}>Load employees</button></p>
        <ul>
          {this.employees.map(e => <li>{e.employee_name}</li>)}
        </ul>
      </div>
    )
  }

  private async loadData(){
    this.employees = (await (await fetch('http://dummy.restapiexample.com/api/v1/employees')).json() as any).data;
    console.log(this.employees)
  }
}
