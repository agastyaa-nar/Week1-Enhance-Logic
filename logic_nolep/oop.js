  class Bank {
    // Tulis Code Disini
    constructor(name){
      this.name = name 
      this.nasabah = []
    }

    register(person, tipe, saldo){
      let accountNumber = Math.floor(1000000 + Math.random() * 9000000);
      let akun

      if (tipe === "platinum"){
        if (saldo < 50000){
          console.log("Saldo awal kurang dari minimum saldo yang ditentukan")
          return
        }
        akun = new Platinum(person.name, accountNumber, saldo)
      } else if (tipe === "silver"){
        if (saldo < 10000) {
          console.log("Saldo awal kurang dari minimum saldo yang ditentukan")
          return
        }
        akun = new Silver(person.name, accountNumber, saldo)
      }
      
      person.bankAccount = akun
      this.nasabah.push(akun)
      console.log(`Selamat datang ke ${this.name}, ${person.name}. Nomor Akun anda adalah ${accountNumber}. Total saldo adalah ${saldo}`)
    }
  }
    
  class Person {
    // Tulis Code Disini
    constructor(name) {
      this.name = name 
      this.bankAccount
    }
  }
    
  
  class Member {
    // Tulis Code Disini
    constructor(name, accountNumber, saldo , minimumBalance, tipe){
      this.memberName = name
      this.accountNumber = accountNumber
      this.minimumBalance = minimumBalance
      this.balance = saldo
      this.transaction = []
      this.type = tipe
    }

    credit(nominal){
        if(nominal < 10000){
          console.log("Belum memenuhi minimal uang yang dapat di setor")
          return
        } 

        this.balance += nominal
        this.transaction.push(new Transaction(nominal, "credit", "nyetor"))
        console.log("Anda sukses menyimpan uang ke dalam bank")
    }

    debet(nominal, note){
      if(this.balance - nominal < this.minimumBalance){
        if(nominal > this.balance){
          console.log("Saldo anda tidak cukup")
        } else {
          console.log("Saldo minimum anda tidak terpenuhi untuk melakukan transaksi")
        }
        return
      }

      this.balance -= nominal
      this.transaction.push(new Transaction(nominal, "debet", note))
      console.log("Anda sukses menarik uang dari bank")
    }

    transfer(tujuan, nominal){
      if(this.balance - nominal < this.minimumBalance){
        console.log(`Anda gagal transfer ke ${tujuan.memberName}`)
        return
      }
      
      this.balance -= nominal
      this.transaction.push(new Transaction(nominal, "debet", `transfer ke akun ${tujuan.memberName}`))

      tujuan.balance += nominal
      tujuan.transaction.push(new Transaction(nominal, "credit", `transfer dari akun ${this.memberName}`))

      console.log(`Anda sukses transfer ke ${tujuan.memberName}`)
    }
  }
  
  class Platinum extends Member {
    // Tulis Code Disini
    constructor(name, accountNumber, saldo){
      super(name, accountNumber, saldo, 50000, "platinum" )
    }
  }
  
  class Silver extends Member {
    // Tulis Code Disini
    constructor(name, accountNumber, saldo){
      super(name, accountNumber, saldo, 10000, "silver" )
    }
  }
  
  class Transaction {
    // Tulis Code Disini
    constructor(nominal, status, note){
      this.nominal = nominal
      this.status = status
      this.date = new Date()
      this.note = note
    }
  }
  
  // TESTCASE
  // TIDAK BOLEH MENGUBAH CODE DI BAWAH INI
  
  let yudhistiraBank = new Bank('Yudhistira Bank')
  let nadia = new Person('Nadia')
  
  yudhistiraBank.register(nadia, 'platinum', 5000)
  // Saldo awal kurang dari minimum saldo yang ditentukan
  yudhistiraBank.register(nadia, 'platinum', 54000)
  //Selamat datang ke Yudhistira Bank, Nadia. Nomor Akun anda adalah 6332937. Total saldo adalah 54000
  
  let nadiaAccount = nadia.bankAccount
  
  /* PASTIKAN BAHWA SALDO SELALU BERKURANG ATAU BERTAMBAH UNTUK SETIAP TRANSAKSI */
  nadiaAccount.credit(300000)
  // Anda sukses menyimpan uang ke dalam bank.
  
  nadiaAccount.credit(1000)
  // Belum memenuhi minimal uang yang dapat di setor
  
  nadiaAccount.debet(200000, 'Beli Keyboard')
  // Anda sukses menarik uang dari bank
  
  nadiaAccount.debet(130000, 'Beli Keyboard Lagi')
  // Saldo minimum anda tidak terpenuhi untuk melakukan transaksi.
  nadiaAccount.debet(600000, 'Bisa gak ya lebih besar dari balance ? ')
  // Saldo anda tidak cukup
  
  let semmi = new Person('Semmi Verian')
  yudhistiraBank.register(semmi, 'silver', 10000000)
  let semmiAccount = semmi.bankAccount
  
  nadiaAccount.transfer(semmiAccount, 100000)
  // Anda sukses transfer ke Semmi Verian
  nadiaAccount.transfer(semmiAccount, 1000000)
  // Anda gagal transfer ke Semmi Verian
  
  console.log(semmiAccount)
  // Silver {
  //   memberName: 'Semmi Verian',
  //   accountNumber: 1319650,
  //   minimumBalance: 10000,
  //   balance: 10100000,
  //   transactions: [
  //     Transaction {
  //       nominal: 100000,
  //       status: 'credit',
  //       date: 2025-01-28T07:13:54.802Z,
  //       note: 'transfer dari akun Nadia'
  //     }
  //   ],
  //   type: 'silver'
  // }
  
  console.log(nadiaAccount)
  // Platinum {
  //   memberName: 'Nadia',
  //   accountNumber: 3971487,
  //   minimumBalance: 50000,
  //   balance: 54000,
  //   transactions: [
  //     Transaction {
  //       nominal: 300000,
  //       status: 'credit',
  //       date: 2025-01-28T07:13:54.800Z,
  //       note: 'nyetor'
  //     },
  //     Transaction {
  //       nominal: 200000,
  //       status: 'debet',
  //       date: 2025-01-28T07:13:54.801Z,
  //       note: 'Beli Keyboard'
  //     },
  //     Transaction {
  //       nominal: 100000,
  //       status: 'debet',
  //       date: 2025-01-28T07:13:54.802Z,
  //       note: 'transfer ke akun Semmi Verian'
  //     }
  //   ],
  //   type: 'platinum'
  // }