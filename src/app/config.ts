declare var ENV;

export class Config {
	public static HOST:string = 'development' === ENV ? 'http://localhost:8000' : 'http://clipvnet.com:8000';
	public static FB_APP_ID:string = 'development' === ENV ? '850835344955953' : '291510107860506';
	public static FB_FANPAGE:string = "https://www.facebook.com/clipvnet/";
}