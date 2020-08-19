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
const { UserProfile } = require("./userProfile");
const { TurnContext } = require("botbuilder");
const { HRDialogs } = require("./scripts/hrhelpdesk");
const { ITDialogs } = require("./scripts/ithelpdesk");
const { SalesDialogs } = require("./scripts/sales");
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

  constructor(rootDialog) {
    super("rootDialog");
    // Create a property used to store dialog state.
    // See https://aka.ms/about-bot-state-accessors to learn more about bot state and state accessors.
    // this.userStateAccessor = userState.createProperty("result");
    // const mm = new ChoicePrompt("mainMenu");
    this.addDialog(new ChoicePrompt("mainMenu"));
    this.addDialog(new ChoicePrompt("HRMainMenu"));
    this.addDialog(new ChoicePrompt("ITMainMenu"));
    this.addDialog(new ChoicePrompt("SalesMainMenu"));
    this.addDialog(new ChoicePrompt("AdminMainMenu"));
    this.addDialog(new ChoicePrompt("LeaveMenu"));
    this.addDialog(new ChoicePrompt("PayrollMenu"));
    this.addDialog(new ChoicePrompt("recruitmentMainMenu"));
    this.addDialog(
      new WaterfallDialog("w", [
        this.mainMenuStep.bind(this),
        this.mainMenuHandler.bind(this),
      ])
    );
    this.initialDialogId = "w";
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
  async HRMainMenuHandler(step) {
    let choice = await step.prompt("HRMainMenu", {
      choices: ChoiceFactory.toChoices(HRMenu),
      style: ListStyle.heroCard,
    });
    switch (choice) {
      case "Leave Management":
        let leaveChoice = await step.prompt("LeaveMenu", {
          choices: ChoiceFactory.toChoices(leaveManagementMenu),
          style: ListStyle.heroCard,
        });
        switch (leaveChoice) {
          case "Request Leave":
            break;
          case "Leave Balance":
            break;
          case "Leave Application Status":
            break;
          case "Delete Leave Application":
            break;
        }
      case "Payroll":
        let choice = await step.prompt("PayrollMenu", {
          choices: ChoiceFactory.toChoices(payrollMenu),
          style: ListStyle.heroCard,
        });
        switch (choice) {
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
      case "Recruitment":
        choice = await step.prompt("recruitmentMainMenu", {
          choices: ChoiceFactory.toChoices(recruitment),
          style: ListStyle.heroCard,
        });
      case "L&D":
      case "Survey":
      case "Holiday Calendar":
      case "Performance Management":
    }
  }

  async mainMenuHandler(step) {
    let choice = step.result.value;
    switch (choice) {
      case "HR Help Desk":
        this.HRMainMenuHandler(step);
        break;
      case "IT Help Desk":
        return await step.prompt("ITMainMenu", {
          choices: ChoiceFactory.toChoices(ITmenu),
          style: ListStyle.heroCard,
        });
        break;
      case "Sales":
        return await step.prompt("SalesMainMenu", {
          choices: ChoiceFactory.toChoices(salesMenu),
          style: ListStyle.heroCard,
        });
      case "Admin":
        return await step.prompt("AdminMainMenu", {
          chocies: ChoiceFactory.toChoices(adminMenu),
          style: ListStyle.heroCard,
        });
    }
  }
}

module.exports.RootDialog = RootDialog;
