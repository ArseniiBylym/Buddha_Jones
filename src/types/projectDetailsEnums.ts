export enum SpotBillingType {
    Billable = 'B',
    NonBillable = 'N',
    SpecUnlessRevised = 'S',
    SpecRevisedBillable = 'R',
}

export const SpotBillingTypeName: { [type: string]: string } = {
    [SpotBillingType.Billable]: 'Billable',
    [SpotBillingType.NonBillable]: 'Non-billable',
    [SpotBillingType.SpecUnlessRevised]: 'Spec unless revised',
    [SpotBillingType.SpecRevisedBillable]: 'Billable revised spec',
};
