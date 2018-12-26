// import { Component } from 'react'
// class SettingsAria2 extends Component {
//     render() {
//         return <div>
// <section className="content no-padding">
//     <div className="settings-table striped hoverable">
//         <ng-setting ng-repeat="option in context.availableOptions" option="option"
//                     ng-model="context.globalOptions[option.key]" default-value="option.defaultValue"
//                     on-change-value="setGlobalOption(key, value, optionStatus)"></ng-setting>
//     </div>
// </section>
// </div>    }}

require('react')=React
var HelloComponent = React.createClass({
    propTypes: {
        fname : React.PropTypes.string.isRequired,
        lname : React.PropTypes.string.isRequired
    },
    render: function() {
        return <span>Hello {this.props.fname} {this.props.lname}</span>;
    }
})
app.value('HelloComponent', HelloComponent);
