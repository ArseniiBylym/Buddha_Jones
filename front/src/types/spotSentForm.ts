import { ClientContact } from './clients';

export interface SpotSentValueParentChildForSubmit {
    parent: number;
    child: number;
}

export interface SpotSentVersionForSubmit {
    campaign_id: number | null;
    campaign_name?: string;
    project_campaign_id: number | null;
    spot_id: number | null;
    spot_name?: string;
    version_id: number | null;
    version_name?: string;
    editors: number[];
    spot_resend: 0 | 1;
    finish_request: 0 | 1;
    line_status_id: number | null;
    sent_via_method: number[] | null;
    finish_accept?: 0 | 1;
    prod_accept?: 0 | 1;
    is_pdf?: 0 | 1;
    graphics_sent_via_method: number[] | null;
    graphics_file: [{file_name: string, file_description: string}];
}

export interface SpotSentValueForSubmit {
    project_id: number | null;
    project_name?: string | null;
    spot_version: SpotSentVersionForSubmit[] | string;
    finish_option?: SpotSentValueParentChildForSubmit | string;
    notes?: string;
    internal_note?: string;
    studio_note?: string;
    status?: 1 | 2;
    full_lock?: 0 | 1;
    spot_sent_date?: Date | string | null;
    deadline?: Date | string | null;
    finishing_house?: number | null;
    finishing_house_name?: string | null;
    framerate?: string | null;
    framerate_note?: string;
    raster_size?: string | null;
    raster_size_note?: string;
    music_cue_sheet?: 0 | 1;
    audio_prep?: 0 | 1;
    video_prep?: 0 | 1;
    spec_note?: string;
    spec_sheet_file?: JSON | null;
    tag_chart?: string;
    delivery_to_client?: SpotSentValueParentChildForSubmit | string | null;
    delivery_note?: string;
    audio?: number[];
    audio_note?: string;
    graphics_finish?: 0 | 1;
    gfx_finish?: 0 | 1;
    customer_contact?: ClientContact[] | string;
}