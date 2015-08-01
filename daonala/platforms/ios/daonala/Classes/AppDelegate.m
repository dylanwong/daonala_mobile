/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  AppDelegate.m
//  HuoYuanTong
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"

#import <Cordova/CDVPlugin.h>
#import <AVOSCloud/AVOSCloud.h>


#define AVOSCloudAppID @"5oizln9pd3t8e259paw1a29tpjm8rbc5761y7h0yl8vf6k9o"
#define AVOSCloudAppKey @"f1ne2oc9te6zg2x27bw04vg769rnk4f8ihhauot6tnjvgi2z"


@implementation AppDelegate

@synthesize window, viewController;

//@synthesize IS_OPEN,TRIGGER_FUNC,PARAMETER,MESSAGE;

- (id)init
{
    /** If you need to do any extra app-specific initialization, you can do it here
     *  -jm
     **/
    NSHTTPCookieStorage* cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    
    [cookieStorage setCookieAcceptPolicy:NSHTTPCookieAcceptPolicyAlways];
    
    int cacheSizeMemory = 8 * 1024 * 1024; // 8MB
    int cacheSizeDisk = 32 * 1024 * 1024; // 32MB
#if __has_feature(objc_arc)
    NSURLCache* sharedCache = [[NSURLCache alloc] initWithMemoryCapacity:cacheSizeMemory diskCapacity:cacheSizeDisk diskPath:@"nsurlcache"];
#else
    NSURLCache* sharedCache = [[[NSURLCache alloc] initWithMemoryCapacity:cacheSizeMemory diskCapacity:cacheSizeDisk diskPath:@"nsurlcache"] autorelease];
#endif
    [NSURLCache setSharedURLCache:sharedCache];
    
    self = [super init];
    return self;
}

#pragma mark UIApplicationDelegate implementation

/**
 * This is main kick off after the app inits, the views and Settings are setup here. (preferred - iOS4 and up)
 */
- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    
    //设置AVOSCloud
    [AVOSCloud setApplicationId:AVOSCloudAppID
                      clientKey:AVOSCloudAppKey];
    
    //统计应用启动情况
    [AVAnalytics trackAppOpenedWithLaunchOptions:launchOptions];
    
    if ([UIApplication instancesRespondToSelector:@selector(registerUserNotificationSettings:)]){    UIUserNotificationType type = UIUserNotificationTypeAlert | UIUserNotificationTypeBadge | UIUserNotificationTypeSound;    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:type categories:nil];    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];}
    
    
    CGRect screenBounds = [[UIScreen mainScreen] bounds];
    
    // Extract the notification data
    NSDictionary *notificationPayload = launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey];
    
    // Create a pointer to the Photo object
    // AppDelegate *delegate=(AppDelegate*)[[UIApplicationsharedApplication]delegate];
    //delegate.MESSAGE = [notificationPayload objectForKey:@"alert"];
    //delegate.TRIGGER_FUNC = [notificationPayload objectForKey:@"method"];
    //delegate.PARAMETER = [notificationPayload objectForKey:@"parameter"];
    //delegate.IS_OPEN = YES;
    
#if __has_feature(objc_arc)
    self.window = [[UIWindow alloc] initWithFrame:screenBounds];
#else
    self.window = [[[UIWindow alloc] initWithFrame:screenBounds] autorelease];
#endif
    self.window.autoresizesSubviews = YES;
    
#if __has_feature(objc_arc)
    self.viewController = [[MainViewController alloc] init];
#else
    self.viewController = [[[MainViewController alloc] init] autorelease];
#endif
    
    // Set your app's start page by setting the <content src='foo.html' /> tag in config.xml.
    // If necessary, uncomment the line below to override it.
    // self.viewController.startPage = @"index.html";
    
    // NOTE: To customize the view's frame size (which defaults to full screen), override
    // [self.viewController viewWillAppear:] in your view controller.
    
    if([[[UIDevice currentDevice] systemVersion] floatValue]<8){
        [application registerForRemoteNotificationTypes:
         UIRemoteNotificationTypeBadge |
         UIRemoteNotificationTypeAlert |
         UIRemoteNotificationTypeSound];
    }else{
        UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeAlert
                                                | UIUserNotificationTypeBadge
                                                | UIUserNotificationTypeSound
                                                                                 categories:nil];
        [application registerUserNotificationSettings:settings];
        [application registerForRemoteNotifications];
    }
    
    self.window.rootViewController = self.viewController;
    [self.window makeKeyAndVisible];
    
    
    return YES;
}

// 推送消息来的时候APP已经运行了。
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))handler {
    
    //NSDictionary *notificationPayload = launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey];
    //NSString *msgType = [notificationPayload objectForKey:@"msgType"];
    
    NSString *javascript = [NSString stringWithFormat:@"pushMsg('%@','%@')",
                            [[userInfo objectForKey:@"aps"] objectForKey:@"alert"],[userInfo objectForKey:@"method"]];
    [self.viewController.webView stringByEvaluatingJavaScriptFromString:javascript];
}

// this happens while we are running ( in the background, or from within our own app )
// only valid if HuoYuanTong-Info.plist specifies a protocol to handle
- (BOOL)application:(UIApplication*)application openURL:(NSURL*)url sourceApplication:(NSString*)sourceApplication annotation:(id)annotation
{
    if (!url) {
        return NO;
    }
    
    [self.viewController processOpenUrl:url];
    
    // all plugins will get the notification, and their handlers will be called
    [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLNotification object:url]];
    
    return YES;
}

// repost all remote and local notification using the default NSNotificationCenter so multiple plugins may respond
- (void)            application:(UIApplication*)application
    didReceiveLocalNotification:(UILocalNotification*)notification
{
    // re-post ( broadcast )
    [[NSNotificationCenter defaultCenter] postNotificationName:CDVLocalNotification object:notification];
}
//APP每次唤起
- (void)applicationDidBecomeActive:(UIApplication *)application {
    application.applicationIconBadgeNumber = 0;
    [self.viewController.webView stringByEvaluatingJavaScriptFromString:@"getLocation()"];
}
//给JS 全局变量 传递token
//
- (void)                                 application:(UIApplication*)application
    didRegisterForRemoteNotificationsWithDeviceToken:(NSData*)deviceToken
{
    AVInstallation *currentInstallation = [AVInstallation currentInstallation];
    [currentInstallation setDeviceTokenFromData:deviceToken];
    [currentInstallation saveInBackground];
    
    // re-post ( broadcast )
    NSString* token = [[[[deviceToken description]
                         stringByReplacingOccurrencesOfString:@"<" withString:@""]
                        stringByReplacingOccurrencesOfString:@">" withString:@""]
                       stringByReplacingOccurrencesOfString:@" " withString:@""];
    NSString *javascript = [NSString stringWithFormat:@"window.OSInfo ={os:'iOS',push:'%@'}",token];
    [self.viewController.webView stringByEvaluatingJavaScriptFromString:javascript];
    //    UIAlertView* alert = [[UIAlertView alloc]initWithTitle:token message:nil delegate:nil
    //                                         cancelButtonTitle:nil otherButtonTitles:nil];
    //    [alert show];
    //
    [[NSNotificationCenter defaultCenter] postNotificationName:CDVRemoteNotification object:token];
}

- (void)                                 application:(UIApplication*)application
    didFailToRegisterForRemoteNotificationsWithError:(NSError*)error
{
    // re-post ( broadcast )
    [[NSNotificationCenter defaultCenter] postNotificationName:CDVRemoteNotificationError object:error];
}

- (NSUInteger)application:(UIApplication*)application supportedInterfaceOrientationsForWindow:(UIWindow*)window
{
    // iPhone doesn't support upside down by default, while the iPad does.  Override to allow all orientations always, and let the root view controller decide what's allowed (the supported orientations mask gets intersected).
    NSUInteger supportedInterfaceOrientations = (1 << UIInterfaceOrientationPortrait) | (1 << UIInterfaceOrientationLandscapeLeft) | (1 << UIInterfaceOrientationLandscapeRight) | (1 << UIInterfaceOrientationPortraitUpsideDown);
    
    return supportedInterfaceOrientations;
}

- (void)applicationDidReceiveMemoryWarning:(UIApplication*)application
{
    [[NSURLCache sharedURLCache] removeAllCachedResponses];
}

@end
