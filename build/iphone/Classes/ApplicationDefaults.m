/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"iFvE4ls3AViRlnCGbOVWlailpDFa1YI4"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"Jo9MNTI86zgr7uzZfpsNfs3wHxjB1fEG"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"YFLNIw3sSByayrQkFDBNHQvoA8mEaovJ"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"5jpQRNkNxGkZbdE46pZitzJPv4wAH4Rq"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"2kjXwihf9n0psKRAA7kXOTjRwudwfgX0"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"MDd5oxIbsAbvFpNfSjOzRkUFt72IomIU"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
