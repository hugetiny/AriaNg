import { Component } from 'react'
class Setting extends Component {
    render() {
        return <div>
<div className="row" data-option-key="{{option.key}}">
    <div className="setting-key setting-key-without-desc col-sm-4">
        <span>{option.nameKey | translate}</span>
        <em>{'(' + option.key + ')'}</em>
        <i className="icon-primary fa fa-question-circle" ng-if="(option.descriptionKey | translate) !== ''"
           data-toggle="popover" data-trigger="hover" data-placement="auto top" data-container="body" data-content="{{option.descriptionKey | translate}}"></i>
        <span className="description" ng-if="option.showCount && option.split && optionValue"
             >{'format.settings.total-count' | translate: {count: getTotalCount()}}</span>
        <i className="icon-primary fa fa-info-circle" ng-if="(option.since && option.since !== '')"data-toggle="tooltip" title="{{('format.requires.aria2-version' | translate: {version: option.since})}}" ng-tooltip-container="body" ng-tooltip-placement="right"></i>
    </div>
    <div className="setting-value col-sm-8">
        <div className={'input-group': !!option.suffix}>
            <div className={"form-group has-feedback $[optionStatus.getStatusFeedbackStyle()]"}>
                <input className="form-control" type="text" placeholder="{{::placeholder}}" ng-disabled="!!option.readonly"
                       ng-if="(option.type === 'string' && !option.showHistory) || option.type === 'integer' || option.type === 'float'"
                       ng-model="optionValue" ng-change="changeValue(optionValue, true)"/>
                <input-dropdown input-class-name="form-control" style="width: 100%;" input-placeholder="{{::placeholder}}"
                                ng-if="option.type === 'string' && option.showHistory" disabled="!!option.readonly"
                                ng-model="optionValue" selected-item="optionValue" allow-custom-input="true"
                                only-show-non-empty-dropdown="true" default-dropdown-items="history"
                                filter-list-method="filterHistory(userInput)"
                                value-changed-method="changeValue(value, from === 'input')"></input-dropdown>
                <textarea className="form-control" rows="6" placeholder="{{::placeholder}}" ng-disabled="!!option.readonly"
                          ng-if="option.type === 'text'"
                          ng-model="optionValue" ng-change="changeValue(optionValue, true)"></textarea>
                <select className={"form-control" style="width: 100%;" ng-disabled="!!option.readonly ${'placeholder': !optionValue}"}
                        ng-if="option.type === 'boolean' || option.type === 'option'"
                        ng-model="optionValue" ng-change="changeValue(optionValue, false)"
                        ng-options="item.value as (item.name | translate) for item in option.options">
                    <option value="" disabled="disabled">{(placeholder | translate)" style="display: none;}</option>
                </select>
                <div className="form-control-icon" ng-if="optionStatus.isShowStatusIcon()">
                    <i className={"fa form-control-feedback $[optionStatus.getStatusIcon()]"}></i>
                </div>
            </div>
            <span className="input-group-addon" ng-if="!!option.suffix">{option.suffix | translate}</span>
        </div>
    </div>
</div>
        </div>    }}
