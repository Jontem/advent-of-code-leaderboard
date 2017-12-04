export interface LeaderBoardResponse {
  readonly members: { [memberId: string]: Member };
}

export interface Member {
  readonly id: string;
  readonly name: string;
  readonly stars: number;
  readonly local_score: number;
  readonly global_score: number;

  readonly completion_day_level: CompletionDayLevel;
}

export interface CompletionDayLevel {
  readonly [dayIndex: string]: {
    readonly [partIndex: string]: {
      readonly get_star_ts: string;
    };
  };
}
