interface JoinRoomData {
	roomId: string;
	stranger: any;
	playlist: any;
}

export interface JoinRoomResult {
	status: string;
	message: string;
	data?: JoinRoomData;
}
