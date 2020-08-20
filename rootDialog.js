/*Hi, I am Ekaa your Enterprise Digital Assistant.
I can help you with Sales, HR and IT related queries.You can type 'help' any time to get help or 'cancel' to cancel any conversation.
*/
/* Please enter your employee ID.(Note: Employee number must be in numeric like 6004211)
 */
/*Thank you for letting me know.*/
/* [12:59 PM] CT-Ekaa
Akshay Gulabrao, what can I do for you? You can type 'help' any time or can type 'cancel' to end any conversation.
/*
/* Here are some suggestions that you can try.*/
// main menu

const {
  ComponentDialog,
  DialogSet,
  DialogTurnStatus,
  NumberPrompt,
  ChoicePrompt,
  TextPrompt,
  WaterfallDialog,
  ChoiceFactory,
  ListStyle,
} = require("botbuilder-dialogs");
// const { UserProfile } = require("./userProfile");
// const { TurnContext } = require("botbuilder");
// const { HRDialogs } = require("./scripts/hrhelpdesk");
// const { ITDialogs } = require("./scripts/ithelpdesk");
// const { SalesDialogs } = require("./scripts/sales");
const MainMenu = ["HR Help Desk", "IT Help Desk", "Sales", "Admin"];
const HRMenu = [
  "Leave Management",
  "Payroll",
  "Recruitment",
  "L&D",
  "Survey",
  "Holiday Calendar",
  "Performance Management",
];

intro =
  "Hi, I am Ekaa your Enterprise Digital Assistant.I can help you with Sales, HR and IT related queries.You can type 'help' any time to get help or 'cancel' to cancel any conversation.";
employeeIDPrompt =
  "Please enter your employee ID.(Note: Employee number must be in numeric like 6004211)";
ITmenu = [
  "Troubleshoot my Issues",
  "Hardwares",
  "System upgrade",
  "Softwares",
  "Reset password",
  "Raise an issue",
];
systemissues = [
  "No Display",
  "Unable to login",
  "Adapter issues",
  "Battery Issues",
  "Software not working correctly",
  "Program not resonding",
  "Frequent Start",
  "Not powering on",
];
softwareIssues = ["Office not working", "Unable to access Office"];
internetIssues = ["No Internet", "Slow Internet", "Limited Access"];
printerIssues = [
  "Offline",
  "Paper jam",
  "Processing job",
  "IO Error",
  "Flashing Lights",
  "Deleting Stuck Print Jobs",
  "Software vs. Document/File Problems",
];
hardwares = [
  "Laptop",
  "Keyboard",
  "Mouse",
  "Monitor", //confirm
  "Webcam", //confirm
  "Headphone", //confirm
  "Mic", //confirm
  "HDMI", //confirm
  "LAN Cable", //confirm
  "LAN Splitter", //confirm
];
hardwaresLaptops = ["Customized Laptops", "Available Laptops"];
//monitor confirm
//webcam confirm
//headphone confirm
//mic confirm
systemUpgrades = ["RAM", "HDD/SSD", "Graphics", "Operating System"];
systemUpgradesRAM = [
  "4GB DDR3",
  "8GB DDR3",
  "16GB DDR3",
  "32GB DDR3",
  "4GB DDR4",
  "8GB DDR4",
  "16GB DDR4",
  "32GB DDR4",
];
systemUpgradesHDDSSD = ["1TB HDD", "2TB HDD", "256GB SSD", "512GB SSD"];
systemUpgradesGraphics = ["1GB", "2GB", "4GB", "8GB"];
systemUpgradesOS = ["Windows", "Linux"];
Softwares = ["Windows", "Linux", "Antivirus", "Office", "Others"]; //confirm

leaveManagementMenu = [
  "Request Leave",
  "Leave Balance",
  "Leave Application Status",
  "Delete Leave Application",
  "cancel",
];
payrollMenu = [
  "Salary Slip",
  "Bonus",
  "Reimbursement",
  "PF",
  "Gratuity",
  "Investment Details",
];
recruitment = ["Refer", "IJP"];
referMenu = ["Refer a candidate", "Referral Policy"];
adminMenu = ["Stationary", "Furniture", "Electronics", "Check Request Status"];
salesMenu = ["Target", "Achieved", "Create Opportunity"];
class RootDialog extends ComponentDialog {
  /**
   * @param {ConversationSate}
   */

  constructor(userState) {
    super("root");
    // Create a property used to store dialog state.
    // See https://aka.ms/about-bot-state-accessors to learn more about bot state and state accessors.
    this.userStateAccessor = userState.createProperty("result");
    // this.userProfile = rootDialog.createProperty("result");
    // const mm = new ChoicePrompt("mainMenu");
    this.addDialog(new ChoicePrompt("mainMenu"));
    this.addDialog(new ChoicePrompt("HRMM"));
    this.addDialog(new ChoicePrompt("ITMainMenu"));
    this.addDialog(new ChoicePrompt("SalesMainMenu"));
    this.addDialog(new ChoicePrompt("AdminMainMenu"));
    this.addDialog(new ChoicePrompt("LeaveMenu"));
    this.addDialog(new ChoicePrompt("PayrollMenu"));
    this.addDialog(new ChoicePrompt("recruitmentMainMenu"));
    this.addDialog(
      new WaterfallDialog("begin", [
        this.mainMenuStep.bind(this),
        this.mainMenuHandler.bind(this),
      ])
    );
    this.addDialog(
      new WaterfallDialog("HRMainMenu", [
        this.HRMenuStep.bind(this),
        this.HRMenuHandler.bind(this),
      ])
    );
    this.addDialog(
      new WaterfallDialog("ITMainMenu", [
        async (step) => {
          return await step.prompt("ITMainMenu", {
            choices: ChoiceFactory.toChoices([ITmenu]),
            style: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "Troubleshoot my issues":
              this.beginDialog("TroubleshootMenu");
              break;
            case "Hardwares":
              break;
            case "System Upgrade":
              break;
            case "Softwares":
              break;
            case "Reset password":
              break;
            case "Raise an issue":
              break;
          }
          return await step.cancelAllDialogs(true);
        },
      ])
    );

    this.addDialog(
      new WaterfallDialog("SalesMainMenu", [
        this.HRMenuStep.bind(this),
        this.HRMenuHandler.bind(this),
      ])
    );
    this.addDialog(
      new WaterfallDialog("AdminMainMenu", [
        this.HRMenuStep.bind(this),
        this.HRMenuHandler.bind(this),
      ])
    );
    this.addDialog(
      new WaterfallDialog("LeaveManagementWaterfall", [
        async (step) => {
          return await step.prompt("LeaveMenu", {
            choices: ChoiceFactory.toChoices(leaveManagementMenu),
            style: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "Request Leave":
              // console.log(186);
              break;
            case "Leave Balance":
              // console.log(189);
              break;
            case "Leave Application Status":
              break;
            case "Delete Leave Application":
              break;
          }
          return await step.cancelAllDialogs(true);
        },
      ])
    );
    this.addDialog(
      new WaterfallDialog("PayrollWaterfall", [
        async (step) => {
          console.log("Payroll Waterfall");
          return await step.prompt("PayrollMenu", {
            choices: ChoiceFactory.toChoices(payrollMenu),
            style: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "Salary Slip":
              break;
            case "Bonus":
              break;
            case "Reimbursement":
              break;
            case "PF":
              break;
            case "Gratuity":
              break;
            case "Investment Details":
              break;
          }
          return await step.cancelAllDialogs(true);
        },
      ])
    );
    this.addDialog(
      new WaterfallDialog("RecruitmentWaterfall", [
        async (step) => {
          // console.log("Payroll Waterfall");
          return await step.prompt("recruitmentMainMenu", {
            choices: ChoiceFactory.toChoices(recruitment),
            style: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "Refer":
              break;
            case "IJP":
              break;
          }
          return await step.cancelAllDialogs(true);
        },
      ])
    );
    this.addDialog(new ChoicePrompt("LDMainMenu"));
    this.addDialog(
      new WaterfallDialog("LDWaterfall", [
        async (step) => {
          // console.log("Payroll Waterfall");
          return await step.prompt("LDMainMenu", {
            choices: ChoiceFactory.toChoices([
              "My Portfolio",
              "Training Courses",
              "Add Certificates",
              "Add Skills",
            ]),
            style: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "My Portfolio":
              break;
            case "Training Courses":
              break;
            case "Add Certificates":
              break;
            case "Add Skills":
              break;
          }
          return await step.cancelAllDialogs(true);
        },
      ])
    );
    this.addDialog(
      new WaterfallDialog("LDWaterfall", [
        async (step) => {
          // console.log("Payroll Waterfall");
          return await step.prompt("LDMainMenu", {
            choices: ChoiceFactory.toChoices([
              "My Portfolio",
              "Training Courses",
              "Add Certificates",
              "Add Skills",
            ]),
            style: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "My Portfolio":
              break;
            case "Training Courses":
              break;
            case "Add Certificates":
              break;
            case "Add Skills":
              break;
          }
          return await step.cancelAllDialogs(true);
        },
      ])
    );
    this.addDialog(
      new WaterfallDialog("SurveyWaterfall", [
        async (step) => {
          await step.context.sendActivity("SURVEY");
          return await step.cancelAllDialogs(true);
        },
      ])
    );
    this.addDialog(
      new WaterfallDialog("CalendarWaterfall", [
        async (step) => {
          // console.log("Payroll Waterfall");
          await step.context.sendActivity("CALENDAR");
          return await step.cancelAllDialogs(true);
        },
      ])
    );
    this.addDialog(
      new WaterfallDialog("PerformanceWaterfall", [
        async (step) => {
          // console.log("Payroll Waterfall");
          await step.context.sendActivity("READ Policy");
          return step.cancelAllDialogs(true);
        },
      ])
    );

    this.initialDialogId = "begin";
  }

  async run(context, accessor) {
    const dialogSet = new DialogSet(accessor);
    dialogSet.add(this);

    const dialogContext = await dialogSet.createContext(context);
    const results = await dialogContext.continueDialog();
    if (results.status === DialogTurnStatus.empty) {
      console.log(`async run(context, accessor)`);
      await dialogContext.beginDialog(this.id);
    }
  }
  async mainMenuStep(step) {
    // console.log("  async mainMenu(step)");
    // await step.context.sendActivity("ehy");
    return await step.prompt("mainMenu", {
      choices: ChoiceFactory.toChoices(MainMenu),
      style: ListStyle.heroCard,
    });
  }

  async mainMenuHandler(step) {
    let choice = step.result.value;
    switch (choice) {
      case "HR Help Desk":
        return await step.beginDialog("HRMainMenu");
      case "IT Help Desk":
        return await step.beginDialog("ITMainMenu");
    }
  }
  async HRMenuStep(step) {
    return await step.prompt("HRMM", {
      choices: ChoiceFactory.toChoices(HRMenu),
      style: ListStyle.heroCard,
    });
  }
  async HRMenuHandler(step) {
    switch (step.result.value) {
      case "Leave Management":
        console.log(238);
        return await step.beginDialog("LeaveManagementWaterfall");
        break;
      case "Payroll":
        console.log(267);
        return await step.beginDialog("PayrollWaterfall");
      case "Recruitment":
        return await step.beginDialog("RecruitmentWaterfall");
      case "L&D":
        return await step.beginDialog("LDWaterfall");
      case "Survey":
        return await step.beginDialog("SurveyWaterfall");
      case "Holiday Calendar":
        return await step.beginDialog("CalendarWaterfall");
      case "Performance Management":
        return await step.beginDialog("PerformanceWaterfall");
    }
  }
}

module.exports.RootDialog = RootDialog;
