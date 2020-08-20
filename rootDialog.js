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
  "Troubleshoot my issues",
  "Hardwares",
  "System upgrade",
  "Softwares",
  "Reset password",
  "Raise an issue",
];
systemissuesChoiceArray = [
  "No Display",
  "Unable to login",
  "Adapter issues",
  "Battery Issues",
  "Software not working correctly",
  "Program not resonding",
  "Frequent Start",
  "Not powering on",
];
softwareIssuesChoiceArray = ["Office not working", "Unable to access Office"];
InternetIssuesChoiceArray = ["No Internet", "Slow Internet", "Limited Access"];
PrinterIssuesChoiceArray = [
  "Offline",
  "Paper jam",
  "Processing job",
  "IO Error",
  "Flashing Lights",
  "Deleting Stuck Print Jobs",
  "Software vs. Document/File Problems",
];
HardwaresChoiceArray = [
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
LaptopChoiceArray = ["Customized Laptops", "Available Laptops"];
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
TroubleshootIssuesChoiceArray = [
  "System issues",
  "Software issues",
  "Internet issues",
  "Printer issues",
  "Other",
];
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
    this.addDialog(new ChoicePrompt("ITMenu"));
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
          return await step.prompt("ITMenu", {
            choices: ChoiceFactory.toChoices(ITmenu),
            style: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "Troubleshoot my issues":
              return await step.beginDialog("TroubleshootMenuWaterfallDialog");
              break;
            case "Hardwares":
              return await step.beginDialog("HardwaresWaterfallDialog");
              break;
            case "System Upgrade":
              return await step.beginDialog("SystemUpgradeMenu");
              break;
            case "Softwares":
              return await step.beginDialog("SoftwaresMenu");
              break;
            case "Reset password":
              return await step.beginDialog("ResetPasswordMenu");
              break;
            case "Raise an issue":
              return await step.beginDialog("RaiseIssueMenu");
              break;
          }
          return await step.cancelAllDialogs(true);
        },
      ])
    );

    this.addDialog(new ChoicePrompt("TroubleshootIssuesChoicePrompt"));
    this.addDialog(
      new WaterfallDialog("TroubleshootMenuWaterfallDialog", [
        async (step) => {
          return await step.prompt("TroubleshootIssuesChoicePrompt", {
            choices: ChoiceFactory.toChoices(TroubleshootIssuesChoiceArray),
            style: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "System issues":
              return await step.beginDialog("SystemIssuesWaterfallDialog");
              break;
            case "Software issues":
              return await step.beginDialog("SoftwareIssuesWaterfallDialog");
              break;
            case "Internet issues":
              return await step.beginDialog("InternetIssuesWaterfallDialog");
              break;
            case "Printer issues":
              return await step.beginDialog("PrinterIssuesWaterfallDialog");
              break;
            case "Other":
              await step.context.sendActivity("Path Completed");

              break;
          }
          return await step.cancelAllDialogs(true);
        },
      ])
    );
    this.addDialog(new ChoicePrompt("systemIssuesChoicePrompt"));
    this.addDialog(
      new WaterfallDialog("SystemIssuesWaterfallDialog", [
        async (step) => {
          return await step.prompt("systemIssuesChoicePrompt", {
            choices: ChoiceFactory.toChoices(systemissuesChoiceArray),
            style: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "No Display":
              await step.context.sendActivity("path completed");
              break;
            case "Unable to login":
              await step.context.sendActivity("path completed");

              break;
            case "Adapter issues":
              await step.context.sendActivity("path completed");

              break;
            case "Battery issues":
              await step.context.sendActivity("path completed");

              break;
            case "Software not working correctly":
              await step.context.sendActivity("path completed");

              break;
            case "Program not responding":
              await step.context.sendActivity("path completed");

              break;
            case "Frequent start":
              await step.context.sendActivity("path completed");

              break;
            case "Not powering on":
              await step.context.sendActivity("path completed");

              break;
          }
          return step.cancelAllDialogs(true);
        },
      ])
    );
    this.addDialog(new ChoicePrompt("InternetIssuesChoicePrompt"));
    this.addDialog(
      new WaterfallDialog("InternetIssuesWaterfallDialog", [
        async (step) => {
          return await step.prompt("InternetIssuesChoicePrompt", {
            choices: ChoiceFactory.toChoices(InternetIssuesChoiceArray),
            style: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "No Internet":
              await step.context.sendActivity("Path Completed");
              break;
            case "Slow Internet":
              await step.context.sendActivity("Path Completed");
              break;
            case "Limited Access":
              await step.context.sendActivity("Path Completed");
              break;
          }
          return step.cancelAllDialogs(true);
        },
      ])
    );
    this.addDialog(new ChoicePrompt("SoftwareIssuesChoicePrompt"));
    this.addDialog(
      new WaterfallDialog("SoftwareIssuesWaterfallDialog", [
        async (step) => {
          return await step.prompt("SoftwareIssuesChoicePrompt", {
            choices: ChoiceFactory.toChoices(softwareIssuesChoiceArray),
            style: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "Office not working":
              await step.context.sendActivity("Path Completed");
              break;
            case "Unable to access Office":
              await step.context.sendActivity("Path Completed");
              break;
          }
          return await step.cancelAllDialogs(true);
        },
      ])
    );
    this.addDialog(new ChoicePrompt("PrinterIssuesChoicePrompt"));
    this.addDialog(
      new WaterfallDialog("PrinterIssuesWaterfallDialog", [
        async (step) => {
          return await step.prompt("PrinterIssuesChoicePrompt", {
            choices: ChoiceFactory.toChoices(PrinterIssuesChoiceArray),
            style: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "Offline":
              await step.context.sendActivity("Path Completed");
              break;
            case "Paper jam":
              await step.context.sendActivity("Path Completed");
              break;
            case "Processing job":
              await step.context.sendActivity("Path Completed");
              break;

            case "IO Error":
              await step.context.sendActivity("Path Completed");
              break;

            case "Flashing Lights":
              await step.context.sendActivity("Path Completed");
              break;
            case "Deleting Stuck Print Jobs":
              await step.context.sendActivity("Path Completed");
              break;
            case "Software vs. Document/File Problems":
              await step.context.sendActivity("Path Completed");
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
              break;
            case "Leave Balance":
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
          await step.context.sendActivity("CALENDAR");
          return await step.cancelAllDialogs(true);
        },
      ])
    );
    this.addDialog(
      new WaterfallDialog("PerformanceWaterfall", [
        async (step) => {
          await step.context.sendActivity("READ Policy");
          return step.cancelAllDialogs(true);
        },
      ])
    );
    this.addDialog(new ChoicePrompt("HardwaresChoicePrompt"));
    this.addDialog(
      new WaterfallDialog("HardwaresWaterfallDialog", [
        async (step) => {
          return await step.prompt("HardwaresChoicePrompt", {
            choices: ChoiceFactory.toChoices(HardwaresChoiceArray),
            style: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "Laptop":
              return await step.beginDialog("LaptopWaterfallDialog");
              break;
            case "Keyboard":
              return await step.beginDialog("KeyboardWaterfallDialog");
              break;
            case "Mouse":
              return await step.beginDialog("MouseWaterfallDialog");
              break;
            case "Monitor":
              await step.context.sendActivity("response recorded");
              break;
            case "Webcam":
              await step.context.sendActivity("response recorded");

              break;
            case "Headphone":
              await step.context.sendActivity("response recorded");

              break;
            case "Mic":
              await step.context.sendActivity("response recorded");

              break;
            case "HDMI":
              await step.context.sendActivity("response recorded");

              break;
            case "LAN Cable":
              await step.context.sendActivity("response recorded");

              break;
            case "LAN Splitter":
              await step.context.sendActivity("response recorded");

              break;
          }
          return step.cancelAllDialogs(true);
        },
      ])
    );
    this.addDialog(new ChoicePrompt("LaptopChoicePrompt"));
    this.addDialog(
      new WaterfallDialog("LaptopWaterfallDialog", [
        async (step) => {
          return await step.prompt("LaptopChoicePrompt", {
            choices: ChoiceFactory.toChoices(LaptopChoiceArray),
            style: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "Available Laptops":
              break;
            case "Customizable Laptops":
              break;
          }
          return await step.cancelAllDialogs(true);
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
      await dialogContext.beginDialog(this.id);
    }
  }
  async mainMenuStep(step) {
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
        return await step.beginDialog("LeaveManagementWaterfall");
        break;
      case "Payroll":
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
