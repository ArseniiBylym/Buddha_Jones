import { SpotBillingType, SpotBillingTypeName } from 'types/projectDetailsEnums';

export class SpotHandler {
    public static getSpotBillingTypeName = (billingType: SpotBillingType | string | null): string => {
        const notDefinedLabel = 'Unspecified';

        if (billingType) {
            return typeof SpotBillingTypeName[billingType] !== 'undefined'
                ? SpotBillingTypeName[billingType]
                : notDefinedLabel;
        }

        return notDefinedLabel;
    };
}
