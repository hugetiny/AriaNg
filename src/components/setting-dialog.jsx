import { Component } from 'react'
class SettingDialog extends Component {
    render() {
        return <div>
<div id="quickSettingModal" className="modal fade" tabindex="-1" role="dialog">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">{(setting ? (setting.title) : 'Quick Settings') | translate}Quick Setting</h4>
            </div>
            <div className="modal-body overlay-wrapper no-padding">
                <div className="settings-table striped hoverable">
                    <ng-setting ng-repeat="option in context.availableOptions" option="option"
                                ng-model="context.globalOptions[option.key]" default-value="option.defaultValue"
                                on-change-value="setGlobalOption(key, value, optionStatus)"></ng-setting>
                </div>
                <div className="overlay" ng-if="context.isLoading">
                    <i className="fa fa-refresh fa-spin"></i>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" translate>Cancel</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
         {/*/.modal */}
        </div>    }}
