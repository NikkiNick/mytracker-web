import { differenceInDays } from 'date-fns';

export class TrackerRecord {
    public id: number;
    public date: Date;
    public amount: number;

    public static calculateDifference(r1: TrackerRecord, r2: TrackerRecord): TrackerRecordDifference {
        const diff: TrackerRecordDifference = new TrackerRecordDifference();
        diff.amountDiff = r1.amount - r2.amount;
        diff.dayDiff = Math.abs(differenceInDays(new Date(r2.date), new Date(r1.date)));
        if (diff.dayDiff === 0) {
            diff.averageDiff = diff.amountDiff as unknown as number;
        } else {
            diff.averageDiff = (diff.amountDiff / diff.dayDiff) as unknown as number;
        }
        return diff;
    }
}
export class TrackerRecordDifference {
    amountDiff: number;
    dayDiff: number;
    averageDiff: number;
}

