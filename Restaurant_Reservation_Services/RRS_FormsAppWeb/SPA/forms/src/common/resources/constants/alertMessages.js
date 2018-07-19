import { inject } from "aurelia-framework";
import { AppController } from "common/controllers/appController";
import { formatString, parseFyiGroupList } from 'common/resources/scripts/helper';
import { log, customLog } from 'common/resources/scripts/log';

@inject(AppController)
export class AlertMessages {
    constructor(appController) {
        this.appController = appController;

        this.Alert1 = 'A new {0} request for {1} has been submitted by {2} for your action ({3})';
        this.Alert2 = 'A new {0} request for {1} has been submitted by {2} to {3} ({4}).';
        this.Alert3 = 'Your {0} request for {1} has been accepted by {2}.';
        this.Alert4 = 'The {0} request for {1} submitted by {2} has been accepted by {3} ({4}).';
        this.Alert5 = 'Your {0} request for {1} has been rejected by {2} ({3}).';
        this.Alert6 = 'Your {0} request for {1} submitted by {2} has been rejected by {3} ({4}).';
        this.Alert7 = 'You have been assigned as a Preparer on a {0} process for {1} ({2}).';
        this.Alert8 = 'You have been assigned as a Review Manager on a {0} process for {1} ({2}).';
        this.Alert9 = 'You have been assigned as a Review Partner on a {0} process for {1} ({2}).';
        this.Alert10 = 'A {0} process for {1} is waiting for your review as Manager ({2}).';
        this.Alert11 = 'Manager has rejected your {0} process for {1} ({2}). ';
        this.Alert12 = 'Your {0} process for {1} has been reviewed by Manager ({2}).';
        this.Alert13 = 'A {0} process for {1} is waiting for your review as Partner ({2}).';
        this.Alert14 = 'A {0} process for {1} is waiting for your review as Secondary Manager ({2}).';
        this.Alert15 = 'Your {0} process for {1} has been reviewed by Secondary Manager ({2}).';
        this.Alert16 = 'A {0} process for {1} has been reviewed by Secondary Manager ({2}).';
        this.Alert17 = 'Secondary Manager has rejected your {0} process for {1} ({2}).';
        this.Alert18 = 'Secondary Manager has rejected the {0} process for {1} ({2}).';
        this.Alert19 = '{0} has rejected your {1} process for {2} ({3}).';
        this.Alert20 = '{0} has rejected the {1} process for {2} ({3}).';
        this.Alert21 = 'Your {0} process for {1} has been reviewed by {2} ({3}).';
        this.Alert22 = 'A {0} process for {1} has been reviewed by {2} {3}.';
        this.Alert23 = 'A {0} process for {1} is waiting for your review as Secondary Partner ({2}).';
        this.Alert24 = 'Your {0} process for {1} has been reviewed by Secondary Partner ({2}).';
        this.Alert25 = 'A {0} process for {1} has been reviewed by {2} as Secondary Partner ({3}).';
        this.Alert26 = 'Secondary Partner has rejected your {0} process for {1} ({2}).';
        this.Alert27 = 'A {0} process for {1} has been rejected by {2} as Secondary Partner ({3}).';
        this.Alert28 = 'Process {0} for {1} has been completed by {2} ({3}).';
        this.Alert29 = 'You have been delegated to process the Execution form of a {0} process for {1} ({2}).';
        this.Alert30 = 'You have been removed from Review Manager in {0} for {1} ({2}).';
        this.Alert31 = 'You have been removed from Review Partner in {0} for {1} ({2}).';
        this.Alert32 = 'You have been removed as Secondary Manager from {0} for {1} ({2}).';
        this.Alert33 = 'You have been removed as Secondary Partner from {0} for {1} ({2}).';
        this.Alert34 = 'A {0} process for {1} is still waiting for your review as {2} ({3}).';
        this.Alert35 = 'You have been invited to join a discussion board for a {0} process for {1} ({2}).';
        this.Alert36 = '{0} has initiated a {1} process for {2} ({3}).';
        this.Alert37 = 'You have been removed from Preparer in {0} for {1} ({2}).';
        this.Alert38 = 'You have been removed as Preparing Competency Job Manager from {0} for {1} ({2}).';
        this.Alert39 = 'You have been assigned as Preparing Competency Job Manager on a {0} request for {1} ({2}).';
        this.Alert40 = 'A new {0} request for {1} has been submitted by {2} to {3} ({4}).';
        this.Alert41 = 'Your process {0} for Client {1} has being Amended by {2}.';
        this.Alert42 = 'PRT Process for Company {0} was set to Nil Declaration.';
        this.Alert43 = 'You have been removed as Coordinator Manager from {0} for {1} ({2}).';
        this.Alert44 = 'You have been assigned as Coordinator Manager on a {0} request for {1} ({2}).';
        this.Alert45 = '{0} {1} finalised and ready for consolidation.';
        this.Alert46 = 'ADM advice released to client ({0}).';
        this.Alert47 = 'Your {0} process for {1} has been reviewed by Partner ({2}).';
        this.Alert48 = 'Partner has rejected your {0} process for {1} ({2}). ';

        //TODO Confirm the following alerts are correct for RMI processes
        this.Alert49 = 'You have been assigned as a Central Support Team First Reviewer on a {0} process for {1} ({2}).';
        this.Alert50 = 'You have been assigned as a Central Support Team Secondary Reviewer on a {0} process for {1} ({2}).';
        this.Alert51 = 'A {0} process for {1} is waiting for your review as Central Support Team First Reviewer ({2}).';
        this.Alert52 = 'Your {0} process for {1} has been reviewed by Central Support Team First Reviewer ({2}).';
        this.Alert53 = 'A {0} process for {1} is waiting for your review as Central Support Team Secondary Reviewer ({2}).';
        this.Alert54 = 'Your {0} process for {1} has been reviewed by Central Support Team Secondary Reviewer ({2}).';
        this.Alert55 = 'You have been assigned as a First Additional Review on a {0} process for {1} ({2}).';
        this.Alert56 = 'You have been assigned as Secondary Additional Review on a {0} process for {1} ({2}).';
        this.Alert57 = 'A {0} process for {1} is waiting for your review as First Additional Review ({2}).';
        this.Alert58 = 'A {0} process for {1} is waiting for your review as Secondary Additional Review ({2}).';
        this.Alert59 = 'Your {0} process for {1} has been reviewed by First Additional Review ({2}).';
        this.Alert60 = 'Your {0} process for {1} has been reviewed by Secondary Additional Review ({2}).';
        this.Alert61 = 'First Additional Review has rejected your {0} process for {1} ({2}). ';
        this.Alert62 = 'Secondary Additional Review has rejected your {0} process for {1} ({2}). ';
        this.Alert63 = 'Central Support Team First Reviewer has rejected your {0} process for {1} ({2}). ';
        this.Alert64 = 'Central Support Team Secondary Reviewer has rejected your {0} process for {1} ({2}). ';

        this.Alert65 = 'Your {0} for {1} has been completed and is pending “Initiation of TD4”. ({2})';
        this.Alert66 = 'You have been invited to join {0} process for {1} ({2}).';

        this.Alert67 = 'You have been removed from Central Support Team First Reviewer in {0} for {1} ({2}).';
        this.Alert68 = 'You have been removed from Central Support Team Secondary Reviewer in {0} for {1} ({2}).';
        this.Alert69 = 'You have been removed from First Additional Review in {0} for {1} ({2}).';
        this.Alert70 = 'You have been removed from Secondary Additional Review in {0} for {1} ({2}).';

        this.Alert71 = 'Your process {0} for Client {1} has being Revice FS by {2}.';
    }

    // Request - Request - Function: reassign()
    generateAlertListRequestReassign(pcjmPrevious, pcjmCurrent) {

        let alertList = [];
        let alert1 = '';
        let alert2 = '';
        if (this.appController.ProcessCode == 'ADM') {
            alert1 = this.Alert43;
            alert2 = this.Alert44;
        } else {
            alert1 = this.Alert38;
            alert2 = this.Alert39;
        }

        if (pcjmPrevious != pcjmCurrent) {
            alertList = [
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(alert1, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: pcjmPrevious,
                    AddressedToName: pcjmPrevious,
                    ReminderTypeId: 1,
                    ActionRequired: false
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(alert2, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: pcjmCurrent,
                    AddressedToName: pcjmCurrent,
                    ReminderTypeId: 1,
                    ActionRequired: true
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert40, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.Author.LookupValue, this.appController.model.PreparingCompetencyJobManager, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.JobManager1Username,
                    AddressedToName: this.appController.model.JobManager1,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            ];
        }

        return alertList;
    }

    // Request - RequestAuthorization - Function: submitPage()
    generateAlertListRequestAuthorization() {
        let addressedToUsername = '';
        let addressedToName = '';
        if (this.appController.ProcessCode == 'ADM') {
            addressedToUsername = this.appController.model.CoordinatorManagerUsername;
            addressedToName = this.appController.model.CoordinatorManager;
        } else {
            addressedToUsername = this.appController.model.PreparingCompetencyJobManagerUse;
            addressedToName = this.appController.model.PreparingCompetencyJobManager;
        }

        let alertList = [
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert1, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.RequestorName, this.appController.model.ProcessId),
                AddressedToUsername: addressedToUsername,
                AddressedToName: addressedToName,
                ReminderTypeId: 1,
                ActionRequired: true
            },
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert2, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.RequestorName, this.appController.model.PreparingCompetencyJobManager, this.appController.model.ProcessId),
                AddressedToUsername: this.appController.model.JobManager1Username,
                AddressedToName: this.appController.model.JobManager1,
                ReminderTypeId: 1,
                ActionRequired: false
            }
        ];

        return alertList;
    }

    // Request - RequestGeneration - Function: generateProcess()
    generateAlertListRequestGenerationSubmission() {
        let name = '';
        if (this.appController.ProcessCode == 'ADM') {
            name = this.appController.model.CoordinatorManager;
        } else {
            name = this.appController.model.PreparingCompetencyJobManager;
        }

        let alertList = [
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert3, this.appController.ProcessCode, this.appController.model.ClientName, name),
                AddressedToUsername: this.appController.model.RequestorUsername,
                AddressedToName: this.appController.model.RequestorName,
                ReminderTypeId: 1,
                ActionRequired: false
            },
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert4, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.RequestorName, name, this.appController.model.ProcessId),
                AddressedToUsername: this.appController.model.JobManager1Username,
                AddressedToName: this.appController.model.JobManager1,
                ReminderTypeId: 1,
                ActionRequired: false
            }
        ];

        return alertList;
    }

    // Request - RequestGeneration - Function: returnToRequestor()
    generateAlertListRequestGenerationReturnToRequestor() {
        let name = '';
        if (this.appController.ProcessCode == 'ADM') {
            name = this.appController.model.CoordinatorManager;
        } else {
            name = this.appController.model.PreparingCompetencyJobManager;
        }
        let alertList = [
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert5, this.appController.ProcessCode, this.appController.model.ClientName, name, this.appController.model.ProcessId),
                AddressedToUsername: this.appController.model.RequestorUsername,
                AddressedToName: this.appController.model.RequestorName,
                ReminderTypeId: 1,
                ActionRequired: true
            },
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert6, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.RequestorName, name, this.appController.model.ProcessId),
                AddressedToUsername: this.appController.model.JobManager1Username,
                AddressedToName: this.appController.model.JobManager1,
                ReminderTypeId: 1,
                ActionRequired: false
            }
        ];

        return alertList;
    }

    // Process - Initiation - Function: next()
    generateAlertListInitiation() {
        let alertList = [
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert7, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                AddressedToUsername: this.appController.model.PreparerUsername,
                AddressedToName: this.appController.model.Preparer,
                ReminderTypeId: 1,
                ActionRequired: true
            },
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert8, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                AddressedToUsername: this.appController.model.ManagerReviewUsername,
                AddressedToName: this.appController.model.ManagerReview,
                ReminderTypeId: 1,
                ActionRequired: false
            },
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert9, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                AddressedToUsername: this.appController.model.PartnerReviewUsername,
                AddressedToName: this.appController.model.PartnerReview,
                ReminderTypeId: 1,
                ActionRequired: false
            }
        ];

        if (this.appController.HasRelatedRequest) {
            if (this.appController.model.PreparingCompetencyJobManagerUse != this.appController.model.JobManager1Username) {
                alertList.push(
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert36, this.appController.model.PreparingCompetencyJobManagerUse, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.JobManager1Username,
                        AddressedToName: this.appController.model.JobManager1,
                        ReminderTypeId: 1,
                        ActionRequired: false
                    }
                );
            }
        }
        else {
            if (this.appController.model.CreatedByUsername != this.appController.model.JobManager1Username) {
                alertList.push(
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert36, this.appController.model.Author.LookupValue, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.JobManager1Username,
                        AddressedToName: this.appController.model.JobManager1,
                        ReminderTypeId: 1,
                        ActionRequired: false
                    }
                );
            }
        }

        if (['RMC', 'RMR'].indexOf(this.appController.ProcessCode) > -1) {
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert49, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.CSTFirstReviewUsername,
                    AddressedToName: this.appController.model.CSTFirstReview,
                    ReminderTypeId: 1,
                    ActionRequired: false
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert50, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.CSTSecondaryReviewUsername,
                    AddressedToName: this.appController.model.CSTSecondaryReview,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            );
        }

        return alertList;
    }

    // Process - Initiation - Function: reassign()
    generateAlertListReassign(previousUsers) {

        let alertList = [];

        if (this.appController.model.PreparerUsername != previousUsers.PreparerUsernamePrevious) {
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert37, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: previousUsers.PreparerUsernamePrevious,
                    AddressedToName: previousUsers.PreparerUsernamePrevious,
                    ReminderTypeId: 1,
                    ActionRequired: false
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert7, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PreparerUsername,
                    AddressedToName: this.appController.model.Preparer,
                    ReminderTypeId: 1,
                    ActionRequired: true
                }
            );
        }

        if (this.appController.model.ManagerReviewUsername != previousUsers.ManagerReviewUsernamePrevious) {
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert30, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: previousUsers.ManagerReviewUsernamePrevious,
                    AddressedToName: previousUsers.ManagerReviewUsernamePrevious,
                    ReminderTypeId: 1,
                    ActionRequired: false
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert8, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.ManagerReviewUsername,
                    AddressedToName: this.appController.model.ManagerReview,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            );
        }

        if (this.appController.model.PartnerReviewUsername != previousUsers.PartnerReviewUsernamePrevious) {
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert31, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: previousUsers.PartnerReviewUsernamePrevious,
                    AddressedToName: previousUsers.PartnerReviewUsernamePrevious,
                    ReminderTypeId: 1,
                    ActionRequired: false
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert9, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PartnerReviewUsername,
                    AddressedToName: this.appController.model.PartnerReview,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            );
        }

        if (this.appController.model.SecondaryManagerReviewUsername != this.appController.model.SecondaryManagerReviewReUsername) {
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert32, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.SecondaryManagerReviewUsername,
                    AddressedToName: this.appController.model.SecondaryManagerReview,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            );
        }

        if (this.appController.model.SecondaryPartnerReviewUsername != this.appController.model.SecondaryPartnerReviewReUsername) {
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert33, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.SecondaryPartnerReviewUsername,
                    AddressedToName: this.appController.model.SecondaryPartnerReview,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            );
        }

        if (['RMC', 'RMR'].indexOf(this.appController.ProcessCode) > -1) {
            if (this.appController.ProcessCode == 'RMC') {
                if (this.appController.model.AdditionalReviewUsername != previousUsers.AdditionalRevUserPrev) {
                    alertList.push(
                        {
                            ProcessCode: this.appController.model.ProcessId,
                            Message: formatString(this.Alert69, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                            AddressedToUsername: previousUsers.AdditionalRevUserPrev,
                            AddressedToName: previousUsers.AdditionalRevUserPrev,
                            ReminderTypeId: 1,
                            ActionRequired: false
                        },
                        {
                            ProcessCode: this.appController.model.ProcessId,
                            Message: formatString(this.Alert55, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                            AddressedToUsername: this.appController.model.AdditionalReviewUsername,
                            AddressedToName: this.appController.model.AdditionalReview,
                            ReminderTypeId: 1,
                            ActionRequired: true
                        }
                    );
                }
            }

            if (this.appController.model.AdditionalReviewUsername2 != previousUsers.AdditionalRevUserPrev2) {
                alertList.push(
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert70, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: previousUsers.AdditionalRevUserPrev2,
                        AddressedToName: previousUsers.AdditionalRevUserPrev2,
                        ReminderTypeId: 1,
                        ActionRequired: false
                    },
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert56, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.AdditionalReviewUsername2,
                        AddressedToName: this.appController.model.AdditionalReview2,
                        ReminderTypeId: 1,
                        ActionRequired: true
                    }
                );
            }

            if (this.appController.model.CSTFirstReviewUsername != previousUsers.CSTFirstReviewUserPrev) {
                alertList.push(
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert67, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: previousUsers.CSTFirstReviewUserPrev,
                        AddressedToName: previousUsers.CSTFirstReviewUserPrev,
                        ReminderTypeId: 1,
                        ActionRequired: false
                    },
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert49, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.CSTFirstReviewUsername,
                        AddressedToName: this.appController.model.CSTFirstReview,
                        ReminderTypeId: 1,
                        ActionRequired: true
                    }
                );
            }

            if (this.appController.model.CSTSecondaryReviewUsername != previousUsers.CSTSecondaryReviewUserPrev) {
                alertList.push(
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert68, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: previousUsers.CSTSecondaryReviewUserPrev,
                        AddressedToName: previousUsers.CSTSecondaryReviewUserPrev,
                        ReminderTypeId: 1,
                        ActionRequired: false
                    },
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert50, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.CSTSecondaryReviewUsername,
                        AddressedToName: this.appController.model.CSTSecondaryReview,
                        ReminderTypeId: 1,
                        ActionRequired: true
                    }
                );
            }
        }
        else if (this.appController.ProcessCode == 'RME') {
            if (this.appController.model.AdditionalReviewUsername2 != previousUsers.AdditionalRevUserPrev2) {
                alertList.push(
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert70, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: previousUsers.AdditionalRevUserPrev2,
                        AddressedToName: previousUsers.AdditionalRevUserPrev2,
                        ReminderTypeId: 1,
                        ActionRequired: false
                    },
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert56, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.AdditionalReviewUsername2,
                        AddressedToName: this.appController.model.AdditionalReview2,
                        ReminderTypeId: 1,
                        ActionRequired: true
                    }
                );
            }
        }

        return alertList;
    }

    // Process - Manager Review - Function: submitPage()
    generateAlertListManagerReview(nextPage) {

        let alertList = [];

        if (nextPage == 'Partner Review') {
            alertList = [
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert12, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PreparerUsername,
                    AddressedToName: this.appController.model.Preparer,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            ];
            if (this.appController.model.PartnerReviewUsername) {
                alertList.push(
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert13, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.PartnerReviewUsername,
                        AddressedToName: this.appController.model.PartnerReview,
                        ReminderTypeId: 1,
                        ActionRequired: true
                    }
                );
            }

        }
        else if (nextPage == 'Secondary Manager Review') {
            alertList = [
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert14, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.SecondaryManagerReviewUsername,
                    AddressedToName: this.appController.model.SecondaryManagerReview,
                    ReminderTypeId: 1,
                    ActionRequired: true
                }
            ];
        }
        else if (nextPage == 'Preparation' || nextPage == 'Submission') {
            alertList = [
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert11, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PreparerUsername,
                    AddressedToName: this.appController.model.Preparer,
                    ReminderTypeId: 1,
                    ActionRequired: true
                }
            ];
        }
        else { // if (nextPage == 'Execution')
            alertList = [
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert12, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PreparerUsername,
                    AddressedToName: this.appController.model.Preparer,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            ];
        }

        return alertList;
    }

    // Process - Partner Review - Function: submitPage()
    generateAlertListPartnerReview(nextPage) {

        let alertList = [];

        if (nextPage == 'Execution' || nextPage == 'Preparation RESP' || nextPage == 'PAY CALC Approval' || nextPage == 'Additional Review') {
            alertList = [
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert21, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.PartnerReview, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PreparerUsername,
                    AddressedToName: this.appController.model.Preparer,
                    ReminderTypeId: 1,
                    ActionRequired: true
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert22, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.PartnerReview, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.ManagerReviewUsername,
                    AddressedToName: this.appController.model.ManagerReview,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            ];

        }
        else if (nextPage == 'Secondary Partner Review') {
            alertList = [
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert23, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.SecondaryPartnerReviewUsername,
                    AddressedToName: this.appController.model.SecondaryPartnerReview,
                    ReminderTypeId: 1,
                    ActionRequired: true
                }
            ];
        }
        else if (nextPage == 'Preparation' || nextPage == 'Submission') {
            alertList = [
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert19, this.appController.model.PartnerReview, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PreparerUsername,
                    AddressedToName: this.appController.model.Preparer,
                    ReminderTypeId: 1,
                    ActionRequired: true
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert20, this.appController.model.PartnerReview, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.ManagerReviewUsername,
                    AddressedToName: this.appController.model.ManagerReview,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            ];
        }

        return alertList;
    }

    // Process - Secondary Partner Review - Function: submitPage()
    generateAlertListSecondaryPartnerReview(nextPage) {

        let alertList = [];

        if (nextPage == 'Execution' || nextPage == 'Preparation RESP' || nextPage == 'PAY CALC Approval') {
            alertList = [
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert24, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PreparerUsername,
                    AddressedToName: this.appController.model.Preparer,
                    ReminderTypeId: 1,
                    ActionRequired: true
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert25, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.SecondaryPartnerReview, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.ManagerReviewUsername,
                    AddressedToName: this.appController.model.ManagerReview,
                    ReminderTypeId: 1,
                    ActionRequired: false
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert25, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.SecondaryPartnerReview, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PartnerReviewUsername,
                    AddressedToName: this.appController.model.PartnerReview,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            ];
        }
        else if (nextPage == 'Partner Review') {
            let secondaryPartner = "";
            if (this.appController.model.SecondaryPartnerReviewRe) {
                secondaryPartner = this.appController.model.SecondaryPartnerReviewRe;
            }
            else {
                secondaryPartner = this.appController.model.SecondaryPartnerReview;
            }

            alertList = [
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert26, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PartnerReviewUsername,
                    AddressedToName: this.appController.model.PartnerReview,
                    ReminderTypeId: 1,
                    ActionRequired: true
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert27, this.appController.ProcessCode, this.appController.model.ClientName, secondaryPartner, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.ManagerReviewUsername,
                    AddressedToName: this.appController.model.ManagerReview,
                    ReminderTypeId: 1,
                    ActionRequired: false
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert27, this.appController.ProcessCode, this.appController.model.ClientName, secondaryPartner, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PreparerUsername,
                    AddressedToName: this.appController.model.Preparer,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            ];
        }

        return alertList;
    }

    // Process - Secondary Manager Review - Function: submitPage()
    generateAlertListSecondaryManagerReview(nextPage) {

        let alertList = [];
        if (nextPage == 'Preparation' || nextPage == 'Submission') {
            alertList = [
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert17, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PreparerUsername,
                    AddressedToName: this.appController.model.Preparer,
                    ReminderTypeId: 1,
                    ActionRequired: true
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert18, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.ManagerReviewUsername,
                    AddressedToName: this.appController.model.ManagerReview,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            ];
        }
        else if (nextPage == 'Partner Review') {
            alertList = [
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert15, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PreparerUsername,
                    AddressedToName: this.appController.model.Preparer,
                    ReminderTypeId: 1,
                    ActionRequired: false
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert16, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.ManagerReviewUsername,
                    AddressedToName: this.appController.model.ManagerReview,
                    ReminderTypeId: 1,
                    ActionRequired: false
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert13, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PartnerReviewUsername,
                    AddressedToName: this.appController.model.PartnerReview,
                    ReminderTypeId: 1,
                    ActionRequired: true
                }
            ];
        }
        else { // if (nextPage == 'Execution')
            alertList = [
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert15, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PreparerUsername,
                    AddressedToName: this.appController.model.Preparer,
                    ReminderTypeId: 1,
                    ActionRequired: false
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert16, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.ManagerReviewUsername,
                    AddressedToName: this.appController.model.ManagerReview,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            ];
        }

        return alertList;
    }

    // Process - Execution - Function: completed()
    generateAlertListCompletedExecution() {

        let alertList = [];
        let completedby = this.appController.model.Preparer;
        if (this.appController.model.DelegateExecutionUsername) {
            completedby = this.appController.model.DelegateExecution;
        }
        if (this.appController.ProcessCode == 'RMR') {
            if (this.appController.model.ClientAndEngagementContinuance == 'Client Continuance') {
                if (this.appController.model.ContinuanceType == 'New Continuance') {
                    if ((this.appController.model.RiskClassification == 'High Risk' || this.appController.model.EngagementRiskClassification == 'High Risk') && this.appController.model.AdditionalReview2) {
                        completedby = this.appController.model.AdditionalReview2;
                    }
                    else if (this.appController.model.PartnerReview != 'No Reviewer') {
                        completedby = this.appController.model.PartnerReview;
                    }
                    else {
                        completedby = this.appController.model.ManagerReview;
                    }
                }
            }
        }
        else if (this.appController.ProcessCode == 'ALE') {
            if (this.appController.model.SecondaryPartnerReview) {
                completedby = this.appController.model.SecondaryPartnerReview;
            }
            else if (this.appController.model.PartnerReview != 'No Reviewer') {
                completedby = this.appController.model.PartnerReview;
            }
            else if (this.appController.model.SecondaryManagerReview) {
                completedby = this.appController.model.SecondaryManagerReview;
            }
            else {
                completedby = this.appController.model.ManagerReview;
            }
        }

        alertList = [
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert28, this.appController.ProcessCode, this.appController.model.ClientName, completedby, this.appController.model.ProcessId),
                AddressedToUsername: this.appController.model.CreatedByUsername,
                AddressedToName: this.appController.model.CreatedByName,
                ReminderTypeId: 1,
                ActionRequired: false
            }
        ];

        if (this.appController.model.DelegateExecutionUsername && this.appController.model.DelegateExecutionUsername != this.appController.model.PreparerUsername) {
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert28, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.DelegateExecution, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PreparerUsername,
                    AddressedToName: this.appController.model.Preparer,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            );
        }

        return alertList;
    }

    // Process - Delegation Panel - Function: delegateUser()
    generateAlertListDelegation() {

        let alertList = [];
        alertList = [
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert29, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                AddressedToUsername: this.appController.model.DelegateExecutionUsername,
                AddressedToName: this.appController.model.DelegateExecution,
                ReminderTypeId: 1,
                ActionRequired: true
            }
        ];

        return alertList;
    }

    // Process - Submision - Function: submitForReview()
    generateAlertListSubmision(skipManager = false) {

        let alertList = [];
        let alert = '';
        let addressedToUsername = '';
        let addressedToName = '';
        if (this.appController.model.ManagerReview != 'No Reviewer' && !skipManager) {
            alert = this.Alert10;
            addressedToUsername = this.appController.model.ManagerReviewUsername;
            addressedToName = this.appController.model.ManagerReview;
        } else if (this.appController.model.PartnerReview != 'No Reviewer') {
            alert = this.Alert13;
            addressedToUsername = this.appController.model.PartnerReviewUsername;
            addressedToName = this.appController.model.PartnerReview;
        }

        alertList = [
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(alert, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                AddressedToUsername: addressedToUsername,
                AddressedToName: addressedToName,
                ReminderTypeId: 1,
                ActionRequired: true
            }
        ];

        return alertList;
    }

    //RMI Alerts

    // Process - Submision /CST Review / Secondary CST Review - Function: submitPage() /submitForReview()
    generateAlertListForCSTReviewers(nextPage, task = '', isCSTFirst = false) {

        let alertList = [];

        if (nextPage == 'First CST Review' && task == 'Approve') {
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert51, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.CSTFirstReviewUsername,
                    AddressedToName: this.appController.model.CSTFirstReview,
                    ReminderTypeId: 1,
                    ActionRequired: true
                }
            );
        }
        else if (nextPage == 'Secondary CST Review' && task == 'Review') {
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert53, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.CSTSecondaryReviewUsername,
                    AddressedToName: this.appController.model.CSTSecondaryReview,
                    ReminderTypeId: 1,
                    ActionRequired: true
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert52, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PreparerUsername,
                    AddressedToName: this.appController.model.Preparer,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            );
        }
        else if ((nextPage == 'Manager Review' || nextPage == 'Partner Review') && task == 'Review') {
            let alert = (nextPage == 'Manager Review' ? this.Alert10 : this.Alert12);
            let addressTo = nextPage == 'Manager Review' ? 'ManagerReview' : 'PartnerReview';
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(alert, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model[`${addressTo}Username`],
                    AddressedToName: this.appController.model[`${addressTo}`],
                    ReminderTypeId: 1,
                    ActionRequired: true
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert54, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PreparerUsername,
                    AddressedToName: this.appController.model.Preparer,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            );
        }
        else if (nextPage == 'Preparation' && task == 'Reject') {
            if (isCSTFirst) {
                alertList.push(
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert63, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.PreparerUsername,
                        AddressedToName: this.appController.model.Preparer,
                        ReminderTypeId: 1,
                        ActionRequired: true
                    }
                );
            }
            else {
                alertList.push(
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert63, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.CSTFirstReviewUsername,
                        AddressedToName: this.appController.model.CSTFirstReview,
                        ReminderTypeId: 1,
                        ActionRequired: false
                    },
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert63, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.PreparerUsername,
                        AddressedToName: this.appController.model.Preparer,
                        ReminderTypeId: 1,
                        ActionRequired: true
                    }
                );
            }
        }

        return alertList;
    }

    // Process - Additional Review /Additional Review 2 - Function: submitPage()
    generateAlertListAdditionalReview(nextPage, task = '', isLoSRisk = false) {
        let alertList = [];
        if (nextPage == 'Partner Review' && task == 'Review') {
            if (this.appController.ProcessCode == 'RMC') {
                alertList.push(
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert55, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.AdditionalReviewUsername,
                        AddressedToName: this.appController.model.AdditionalReview,
                        ReminderTypeId: 1,
                        ActionRequired: true
                    },
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert56, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.AdditionalReviewUsername2,
                        AddressedToName: this.appController.model.AdditionalReview2,
                        ReminderTypeId: 1,
                        ActionRequired: false
                    }
                );
            }
            else if (this.appController.ProcessCode == 'RME') {
                alertList.push(
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert56, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.AdditionalReviewUsername2,
                        AddressedToName: this.appController.model.AdditionalReview2,
                        ReminderTypeId: 1,
                        ActionRequired: false
                    }
                );
            }
        }
        else if (nextPage == 'Additional Review' && task == 'Review') {
            if (this.appController.ProcessCode == 'RMC') {
                alertList.push(
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert57, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.AdditionalReviewUsername,
                        AddressedToName: this.appController.model.AdditionalReview,
                        ReminderTypeId: 1,
                        ActionRequired: true
                    }
                );
                if (this.appController.model.PartnerReview == 'No Reviewer') {
                    alertList.push(
                        {
                            ProcessCode: this.appController.model.ProcessId,
                            Message: formatString(this.Alert56, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                            AddressedToUsername: this.appController.model.AdditionalReviewUsername2,
                            AddressedToName: this.appController.model.AdditionalReview2,
                            ReminderTypeId: 1,
                            ActionRequired: false
                        }
                    );
                }
            }
            else if (this.appController.ProcessCode == 'RME') {
                alertList.push(
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(this.Alert58, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.AdditionalReviewUsername2,
                        AddressedToName: this.appController.model.AdditionalReview2,
                        ReminderTypeId: 1,
                        ActionRequired: true
                    }
                );
            }
        }
        else if (nextPage == 'Additional Review 2' && task == 'Review') {
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert58, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.AdditionalReviewUsername2,
                    AddressedToName: this.appController.model.AdditionalReview2,
                    ReminderTypeId: 1,
                    ActionRequired: true
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert59, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PreparerUsername,
                    AddressedToName: this.appController.model.Preparer,
                    ReminderTypeId: 1,
                    ActionRequired: false
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert59, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.ManagerReviewUsername,
                    AddressedToName: this.appController.model.ManagerReview,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            );
        }
        else if ((nextPage == 'Execution' || nextPage == 'Completed') && task == 'Review') {
            let alert = (isLoSRisk ? this.Alert59 : this.Alert60);
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(alert, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.PreparerUsername,
                    AddressedToName: this.appController.model.Preparer,
                    ReminderTypeId: 1,
                    ActionRequired: false
                },
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(alert, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.ManagerReviewUsername,
                    AddressedToName: this.appController.model.ManagerReview,
                    ReminderTypeId: 1,
                    ActionRequired: false
                }
            );

            if (this.appController.model.PartnerReview != 'No Reviewer') {
                alertList.push(
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(alert, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.PartnerReviewUsername,
                        AddressedToName: this.appController.model.PartnerReview,
                        ReminderTypeId: 1,
                        ActionRequired: false
                    }
                );
            }

            if (this.appController.ProcessCode == 'RMC') {
                alertList.push(
                    {
                        ProcessCode: this.appController.model.ProcessId,
                        Message: formatString(alert, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                        AddressedToUsername: this.appController.model.AdditionalReviewUsername,
                        AddressedToName: this.appController.model.AdditionalReview,
                        ReminderTypeId: 1,
                        ActionRequired: false
                    }
                );
            }
        }
        else if (nextPage == 'Manager Review' && task == 'Reject') {
            let alert = (isLoSRisk ? this.Alert61 : this.Alert62);
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(alert, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                    AddressedToUsername: this.appController.model.ManagerReviewUsername,
                    AddressedToName: this.appController.model.ManagerReview,
                    ReminderTypeId: 1,
                    ActionRequired: true
                }
            );
        }

        return alertList;
    }

    // Process - Execution - Function: amendment()
    generateAlertListAmendment(currentUser) {

        let alertList = [];
        alertList = [
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert41, this.appController.model.ProcessId, this.appController.model.ClientName, currentUser),
                AddressedToUsername: this.appController.model.PreparerUsername,
                AddressedToName: this.appController.model.Preparer,
                ReminderTypeId: 1,
                ActionRequired: true
            },
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert41, this.appController.model.ProcessId, this.appController.model.ClientName, currentUser),
                AddressedToUsername: this.appController.model.ManagerReviewUsername,
                AddressedToName: this.appController.model.ManagerReview,
                ReminderTypeId: 1,
                ActionRequired: false
            },
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert41, this.appController.model.ProcessId, this.appController.model.ClientName, currentUser),
                AddressedToUsername: this.appController.model.PartnerReviewUsername,
                AddressedToName: this.appController.model.PartnerReview,
                ReminderTypeId: 1,
                ActionRequired: false
            }
        ];

        let delegateExecution = "";
        let delegateExecutionUsername = "";
        if (this.appController.model.DelegateExecutionUsername && this.appController.model.DelegateExecutionUsername != this.appController.model.PreparerUsername) {
            delegateExecution = this.appController.model.DelegateExecution;
            delegateExecutionUsername = this.appController.model.DelegateExecutionUsername;
        }
        if (delegateExecution) {
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert41, this.appController.model.ProcessId, this.appController.model.ClientName, currentUser),
                    AddressedToUsername: delegateExecutionUsername,
                    AddressedToName: delegateExecution,
                    ReminderTypeId: 1,
                    ActionRequired: true
                }
            );
        }


        let secondaryPartner = "";
        let secondaryPartnerUsername = "";
        if (this.appController.model.SecondaryPartnerReviewRe) {
            secondaryPartner = this.appController.model.SecondaryPartnerReviewRe;
            secondaryPartnerUsername = this.appController.model.SecondaryPartnerReviewReUsername;
        }
        else if (this.appController.model.SecondaryPartnerReview) {
            secondaryPartner = this.appController.model.SecondaryPartnerReview;
            secondaryPartnerUsername = this.appController.model.SecondaryPartnerReviewUsername;
        }
        if (secondaryPartner) {
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert41, this.appController.model.ProcessId, this.appController.model.ClientName, currentUser),
                    AddressedToUsername: secondaryPartnerUsername,
                    AddressedToName: secondaryPartner,
                    ReminderTypeId: 1,
                    ActionRequired: true
                }
            );
        }

        let secondaryManager = "";
        let secondaryManagerUsername = "";
        if (this.appController.model.SecondaryManagerReviewRe) {
            secondaryManager = this.appController.model.SecondaryManagerReviewRe;
            secondaryManagerUsername = this.appController.model.SecondaryManagerReviewReUsername;
        }
        else if (this.appController.model.SecondaryManagerReview) {
            secondaryManager = this.appController.model.SecondaryManagerReview;
            secondaryManagerUsername = this.appController.model.SecondaryManagerReviewUsername;
        }
        if (secondaryManager) {
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert41, this.appController.model.ProcessId, this.appController.model.ClientName, currentUser),
                    AddressedToUsername: secondaryManagerUsername,
                    AddressedToName: secondaryManager,
                    ReminderTypeId: 1,
                    ActionRequired: true
                }
            );
        }

        return alertList;
    }

    // Process - TFS Execution - Function: submitPage()
    generateAlertListFinalManager() {

        let alertList = [
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert65, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                AddressedToUsername: this.appController.model.ManagerReviewUsername,
                AddressedToName: this.appController.model.ManagerReview,
                ReminderTypeId: 1,
                ActionRequired: true
            },
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert65, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                AddressedToUsername: this.appController.model.PreparerUsername,
                AddressedToName: this.appController.model.Preparer,
                ReminderTypeId: 1,
                ActionRequired: false
            },
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert65, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                AddressedToUsername: this.appController.model.PartnerReviewUsername,
                AddressedToName: this.appController.model.PartnerReview,
                ReminderTypeId: 1,
                ActionRequired: false
            }
        ];

        return alertList;
    }

    // Request - RequestGeneration - Function: generateProcess()
    generateAlertListForInterimReview(step, task) {
        let alertList = [];
        let alert = '';
        let addressedToUsername = '';
        let addressedToName = '';

        if (step == 'Preparer' && task == 'Review') {
            alert = this.Alert12;
            addressedToUsername = this.appController.model.PreparerUsername;
            addressedToName = this.appController.model.Preparer;
        }
        else if (step == 'Preparer' && task == 'Partner Review') {
            alert = this.Alert47;
            addressedToUsername = this.appController.model.PreparerUsername;
            addressedToName = this.appController.model.Preparer;
        }
        else if (step == 'Preparer' && task == 'Reject') {
            alert = this.Alert11;
            addressedToUsername = this.appController.model.PreparerUsername;
            addressedToName = this.appController.model.Preparer;
        }
        else if (step == 'Preparer' && task == 'Partner Reject') {
            alert = this.Alert48;
            addressedToUsername = this.appController.model.PreparerUsername;
            addressedToName = this.appController.model.Preparer;
        }
        else if (step == 'Manager') {
            alert = this.Alert10;
            addressedToUsername = this.appController.model.ManagerReviewUsername;
            addressedToName = this.appController.model.ManagerReview;
        }
        else if (step == 'Secondary Manager') {
            alert = this.Alert14;
            addressedToUsername = this.appController.model.SecondaryManagerReviewUsername;
            addressedToName = this.appController.model.SecondaryManagerReview;
        }
        else if (step == 'Partner') {
            alert = this.Alert13;
            addressedToUsername = this.appController.model.PartnerReviewUsername;
            addressedToName = this.appController.model.PartnerReview;
        }
        else if (step == 'Secondary Partner') {
            alert = this.Alert23;
            addressedToUsername = this.appController.model.SecondaryPartnerReviewUsername;
            addressedToName = this.appController.model.SecondaryPartnerReview;
        }
        else {
            // Should never get here?

            customLog("Invalid step specified in generateAlertListForInterimReview() function.", "", "error");
            return alertList;
        }

        alertList = [
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(alert, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                AddressedToUsername: addressedToUsername,
                AddressedToName: addressedToName,
                ReminderTypeId: 1,
                ActionRequired: true
            }
        ];

        return alertList;
    }

    // Process - Submission - Function: submitForReview()
    generateAlertListNilDeclaration() {

        let alertList = [];
        alertList = [
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert42, this.appController.ClientName),
                AddressedToUsername: this.appController.model.ManagerReviewUsername,
                AddressedToName: this.appController.model.ManagerReview,
                ReminderTypeId: 1,
                ActionRequired: true
            }
        ];

        return alertList;
    }

    // Process - Preparation - Function: createRelatedItem
    generateAlertListRequestAdviced(pcjmName, pcjmUsername, processId) {

        let alertList = [];
        alertList = [
            {
                ProcessCode: processId,
                Message: formatString(this.Alert39, this.appController.ProcessCode, this.appController.model.ClientName, processId),
                AddressedToUsername: pcjmUsername,
                AddressedToName: pcjmName,
                ReminderTypeId: 1,
                ActionRequired: true
            }
        ];
        return alertList;
    }

    // Process - ADS Execution - Function: save
    generateAlertListADSAdviceReleased(userList) {

        let alertList = [];
        userList.forEach(user => {
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert45, this.appController.model.ProcessId, this.appController.model.ProcessCompetency),
                    AddressedToUsername: user.Username,
                    AddressedToName: user.Name,
                    ReminderTypeId: 1,
                    ActionRequired: false
                });
        });
        return alertList;
    }

    // Process - ADM Execution - Function: completed
    generateAlertListADMAdviceReleasedToClient(userList, step, processId = '', currentUser = '') {

        let alertList = [];
        userList.forEach(user => {
            if (step == 'Completed') {
                alertList.push(
                    {
                        ProcessCode: processId,
                        Message: formatString(this.Alert46, this.appController.model.ProcessId),
                        AddressedToUsername: user.Username,
                        AddressedToName: user.Name,
                        ReminderTypeId: 1,
                        ActionRequired: false
                    },
                    {
                        ProcessCode: processId,
                        Message: formatString(this.Alert28, 'ADS', this.appController.model.ClientName, currentUser, processId),
                        AddressedToUsername: user.Username,
                        AddressedToName: user.Name,
                        ReminderTypeId: 1,
                        ActionRequired: false
                    }
                );
            }
            else {
                alertList.push(
                    {
                        ProcessCode: processId,
                        Message: formatString(this.Alert41, processId, this.appController.model.ClientName, currentUser),
                        AddressedToUsername: user.Username,
                        AddressedToName: user.Name,
                        ReminderTypeId: 1,
                        ActionRequired: (user.Role == 'PREP') ? true : false
                    });
            }
        });
        return alertList;
    }

    // Process - TD4 Preparation, Intermediary - Function: submit, review
    generateAlertListForIntermediary(sendToManager, managerTask) {

        let alertList = [];
        let alert = '';
        let addressedToUsername = '';
        let addressedToName = '';
        if (sendToManager) {
            alert = this.Alert10;
            addressedToUsername = this.appController.model.ManagerReviewUsername;
            addressedToName = this.appController.model.ManagerReview;
        }
        else {
            if (managerTask == 'Reject') {
                alert = this.Alert11;
                addressedToUsername = this.appController.model.PreparerUsername;
                addressedToName = this.appController.model.Preparer;
            }
            else {
                alert = this.Alert12;
                addressedToUsername = this.appController.model.PreparerUsername;
                addressedToName = this.appController.model.Preparer;
            }
        }

        alertList = [
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(alert, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                AddressedToUsername: addressedToUsername,
                AddressedToName: addressedToName,
                ReminderTypeId: 1,
                ActionRequired: true
            }
        ];

        return alertList;
    }

    generateAlertListAssignPersonPermissions(addressedToUsername, addressedToName) {
        let alertList = [
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert66, this.appController.ProcessCode, this.appController.model.ClientName, this.appController.model.ProcessId),
                AddressedToUsername: addressedToUsername,
                AddressedToName: addressedToName,
                ReminderTypeId: 1,
                ActionRequired: false
            }
        ];

        return alertList;
    }


    // Process - Execution - Function: reviceFS()
    generateAlertListReviceFS(currentUser) {

        let alertList = [];
        alertList = [
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert71, this.appController.model.ProcessId, this.appController.model.ClientName, currentUser),
                AddressedToUsername: this.appController.model.PreparerUsername,
                AddressedToName: this.appController.model.Preparer,
                ReminderTypeId: 1,
                ActionRequired: false
            },
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert71, this.appController.model.ProcessId, this.appController.model.ClientName, currentUser),
                AddressedToUsername: this.appController.model.ManagerReviewUsername,
                AddressedToName: this.appController.model.ManagerReview,
                ReminderTypeId: 1,
                ActionRequired: false
            },
            {
                ProcessCode: this.appController.model.ProcessId,
                Message: formatString(this.Alert71, this.appController.model.ProcessId, this.appController.model.ClientName, currentUser),
                AddressedToUsername: this.appController.model.PartnerReviewUsername,
                AddressedToName: this.appController.model.PartnerReview,
                ReminderTypeId: 1,
                ActionRequired: true
            }
        ];

        let secondaryPartner = "";
        let secondaryPartnerUsername = "";
        if (this.appController.model.SecondaryPartnerReviewRe) {
            secondaryPartner = this.appController.model.SecondaryPartnerReviewRe;
            secondaryPartnerUsername = this.appController.model.SecondaryPartnerReviewReUsername;
        }
        else if (this.appController.model.SecondaryPartnerReview) {
            secondaryPartner = this.appController.model.SecondaryPartnerReview;
            secondaryPartnerUsername = this.appController.model.SecondaryPartnerReviewUsername;
        }
        if (secondaryPartner) {
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert71, this.appController.model.ProcessId, this.appController.model.ClientName, currentUser),
                    AddressedToUsername: secondaryPartnerUsername,
                    AddressedToName: secondaryPartner,
                    ReminderTypeId: 1,
                    ActionRequired: true
                }
            );
        }

        let secondaryManager = "";
        let secondaryManagerUsername = "";
        if (this.appController.model.SecondaryManagerReviewRe) {
            secondaryManager = this.appController.model.SecondaryManagerReviewRe;
            secondaryManagerUsername = this.appController.model.SecondaryManagerReviewReUsername;
        }
        else if (this.appController.model.SecondaryManagerReview) {
            secondaryManager = this.appController.model.SecondaryManagerReview;
            secondaryManagerUsername = this.appController.model.SecondaryManagerReviewUsername;
        }
        if (secondaryManager) {
            alertList.push(
                {
                    ProcessCode: this.appController.model.ProcessId,
                    Message: formatString(this.Alert71, this.appController.model.ProcessId, this.appController.model.ClientName, currentUser),
                    AddressedToUsername: secondaryManagerUsername,
                    AddressedToName: secondaryManager,
                    ReminderTypeId: 1,
                    ActionRequired: true
                }
            );
        }

        return alertList;
    }
}