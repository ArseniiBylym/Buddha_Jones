export class SpotsBillingActionsClass {
    public constructSpotsToBillUrl = (): string => {
        return '/portal/spots-to-bill';
    };

    public constructSpotToBillFormUrl = (billId: number): string => {
        return '/portal/bill-spot-form/' + billId;
    };
}
