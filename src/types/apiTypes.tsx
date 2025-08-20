export interface Category {
  name: string;
  stripped: string;
}

export interface BusinessType {
  name: string;
  stripped: string;
}

export interface Plan {
  name: string;
  stripped: string;
}

export interface ChatHistoryCommand {
  command: string | null;
  total_count: number;
}

export interface DraftsViaCategory {
  total_count: number;
  Category: Category;
}

export interface ItemHistoryAction {
  action: string;
  total_count: number;
}

export interface ItemsViaCategory {
  total_count: number;
  Category: Category;
}

export interface ItemsViaCurrency {
  currency: string | null;
  total_count: number;
}

export interface ItemsViaFileType {
  file_type: string | null;
  total_count: number;
}

export interface ItemViewsSum {
  total_views: string;
}

export interface AnalysisData {
  date?: string;
  week?: string;
  month?: string;
  year?: string;
  total_count: number;
}

export interface UsersViaBusinessType {
  total_count: number;
  BusinessType: BusinessType | null;
}

export interface UsersViaPlan {
  total_count: number;
  Plan: Plan;
}

export interface UsersViaBoolean {
  buyer?: boolean;
  seller?: boolean;
  active_subscription?: boolean;
  banned?: boolean;
  agreement?: boolean;
  total_count: number;
}

export interface UsersViaCurrency {
  currency: string;
  total_count: number;
}

export interface UsersViaCountry {
  country: string | null;
  total_count: number;
}

export interface UsersViaCountryState {
  country: string | null;
  state: string | null;
  total_count: number;
}

export interface UsersViaAccess {
  access: number;
  total_count: number;
}

export interface UsersByCountryCode {
  countryCode: string;
  count: number;
}

export interface GeneralStatsData {
  total_business_types: number;
  total_plans: number;
  total_categories: number;
  total_chat_history: number;
  total_drafts: number;
  total_item_history: number;
  total_items: number;
  total_temps: number;
  total_users: number;
  total_webhooks: number;
  total_chat_history_via_command: ChatHistoryCommand[];
  total_drafts_via_category: DraftsViaCategory[];
  total_item_history_via_action: ItemHistoryAction[];
  total_items_via_category: ItemsViaCategory[];
  total_items_via_currency: ItemsViaCurrency[];
  total_items_via_file_type: ItemsViaFileType[];
  item_views_sum: ItemViewsSum[];
  itemAnalysisDaily: AnalysisData[];
  itemAnalysisWeekly: AnalysisData[];
  itemAnalysisMonthly: AnalysisData[];
  itemAnalysisYearly: AnalysisData[];
  user_views_sum: ItemViewsSum[];
  total_users_via_business_type: UsersViaBusinessType[];
  total_users_via_plan: UsersViaPlan[];
  total_users_via_buyer: UsersViaBoolean[];
  total_users_via_seller: UsersViaBoolean[];
  total_users_via_currency: UsersViaCurrency[];
  total_users_via_country: UsersViaCountry[];
  total_users_via_country_and_state: UsersViaCountryState[];
  total_users_via_active_subscription: UsersViaBoolean[];
  total_users_via_banned: UsersViaBoolean[];
  total_users_via_agreement: UsersViaBoolean[];
  total_users_via_access: UsersViaAccess[];
  total_users_by_country: UsersByCountryCode[];
  userAnalysisDaily: AnalysisData[];
  userAnalysisWeekly: AnalysisData[];
  userAnalysisMonthly: AnalysisData[];
  userAnalysisYearly: AnalysisData[];
  chatHistoryAnalysisDaily: AnalysisData[];
  chatHistoryAnalysisWeekly: AnalysisData[];
  chatHistoryAnalysisMonthly: AnalysisData[];
  chatHistoryAnalysisYearly: AnalysisData[];
}

export interface GeneralStats {
  success: boolean;
  message: string;
  data: GeneralStatsData;
}