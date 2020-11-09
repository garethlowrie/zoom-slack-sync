export interface SlackMember {
	id: string;
	team_id: string;
	name: string;
	deleted: boolean;
	color: string;
	real_name: string;
	tz: string;
	tz_label: string;
	tz_offset: number;
	profile: SlackProfile;
	is_admin: boolean;
	is_owner: boolean;
	is_primary_owner: boolean;
	is_restricted: boolean;
	is_ultra_restricted: boolean;
	is_bot: boolean;
	updated: number;
	is_app_user?: boolean | null;
	has_2fa: boolean;
}

export interface SlackProfile {
	avatar_hash: string;
	status_text?: string | null;
	status_emoji?: string | null;
	real_name: string;
	display_name: string;
	real_name_normalized: string;
	display_name_normalized: string;
	email: string;
	image_24: string;
	image_32: string;
	image_48: string;
	image_72: string;
	image_192: string;
	image_512: string;
	team?: string | null;
	image_1024?: string | null;
	image_original?: string | null;
	first_name?: string | null;
	last_name?: string | null;
	title?: string | null;
	phone?: string | null;
	skype?: string | null;
}

export interface SlackResponseMetadata {
	next_cursor: string;
}
