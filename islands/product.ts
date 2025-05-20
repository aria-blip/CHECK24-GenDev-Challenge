export class Product {
    productId: string =""
    providerName: string = ""
    speed: string = ""
    monthlyCostInCent: number = 0
    monthlyCostInCentFrom25thMonth: number = 0
    discountInCent: number = 0
    contractDurationInMonths: string = ""
    connectionType: string = ""
    additionalInfo:string[][] = []
    constructor(
        productId: string ="" ,
        providerName: string="",
        speed: string="",
        monthlyCostInCent: number=0,
        monthlyCostInCentFrom25thMonth: number=0,
        discountInCent: number=0,
        contractDurationInMonths: string="",
        connectionType: string="",
        additionalInfo:string[][] = []
    ) {
        this.productId = productId;
        this.providerName = providerName;
        this.speed = speed;
        this.monthlyCostInCent = monthlyCostInCent;
        this.monthlyCostInCentFrom25thMonth = monthlyCostInCentFrom25thMonth;
        this.discountInCent = discountInCent;
        this.contractDurationInMonths = contractDurationInMonths;
        this.connectionType = connectionType;
        this.additionalInfo = additionalInfo;
    }
}