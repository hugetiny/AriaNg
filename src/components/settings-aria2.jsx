import { Component } from 'react'
class SettingsAria2 extends Component {
    render() {
        return <div>
<section className="content no-padding">
    <div className="settings-table striped hoverable">
        <ng-setting ng-repeat="option in context.availableOptions" option="option"
                    ng-model="context.globalOptions[option.key]" default-value="option.defaultValue"
                    on-change-value="setGlobalOption(key, value, optionStatus)"></ng-setting>
    </div>
</section>
</div>    }}
