/**
 * Created by Godai Yuusaku on 10/6/2016.
 */
// Create a Bank prototype and a Customer prototype - Must use prototypes - A Bank must have a place for customers - Customer must have place for BankAccounts
function Bank(name, address, phoneNo) {
    this.name = name;
    this.address = address;
    this.phoneNo = phoneNo;
    this.accounts = [];

    this.getAssets = function()
    {
        var assets = 0;
        for (var i = 0; i < this.accounts.length; i++)
        {
            assets += this.accounts[i].account.getBalance();
        }
        return assets;
    };

    this.getAccts = function()
    {
        return this.accounts.length;
    };

    this.newAcct = function(customer)
    {
        this.accounts.push(customer);
    };
}

function Customer(name, address, phoneNo, acctNo, type, bank, balance) {
    this.name = name;
    this.address = address;
    this.phoneNo = phoneNo;
    this.account = type === 'checking' ? new CheckingAccount(acctNo, balance) : new SavingsAccount(acctNo, balance);
    bank.newAcct(this);
}

function BankAccount(accountNumber, balance) {
    var balance = balance || 0;

    this.accountNumber = accountNumber;

    this.getBalance = function () {
        return balance;
    };

    this.deposit = function (amount, acctNo) {
        if (acctNo === this.accountNumber) {
            balance += amount;
        }
        else
        {
            console.log('Invalid account number');
        }
    };

    this.withdraw = function (amount, acctNo) {
        if (acctNo === this.accountNumber) {
            balance -= amount;
        }
        else
        {
            console.log('Invalid account number');
        }
    };
}

// SavingsAccount
function SavingsAccount(accountNumber, balance) {
    BankAccount.call(this, accountNumber, balance);

    var interest = 0.15;

    this.setInterestRate = function(newRate)
    {
        interest = newRate;
    }
    this.applyInterest = function()
    {
        this.deposit(this.getBalance() * interest, this.accountNumber);
    }
}

SavingsAccount.prototype = Object.create(BankAccount.prototype);
SavingsAccount.prototype.constructor = SavingsAccount;


// CheckingAccount
function CheckingAccount(accountNumber, balance) {
    BankAccount.call(this, accountNumber, balance);
    var overdraftFee = 15;
    var numberOfChecks = 200;

    this.setOverdraft = function(newFee)
    {
        overdraftFee = newFee;
    };

    this.chargeOverdraft = function()
    {
        this.withdraw(overdraftFee, this.accountNumber);
    }

    this.setNoChecks = function(newNo)
    {
        numberOfChecks = newNo;
    }
}

CheckingAccount.prototype = Object.create(BankAccount.prototype);
CheckingAccount.prototype.constructor = CheckingAccount;

