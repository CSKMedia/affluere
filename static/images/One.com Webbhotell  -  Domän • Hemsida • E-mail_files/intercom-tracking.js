function setIntercomTracking() {

    trackOnClick('#frontpageOneWebLink','seen-webeditor');
    trackOnClick('#frontpageWebshopLink','seen-webshop');

    // WordPress tracking
    trackIfElement('#wPOverviewHeader','seen-wordpress');

    // Blog tracking
    trackIfElement('#blogFrontpageHeader','seen-blog');
    trackIfElement('#blogCreated','created-blog');

    // SiteLock tracking
    trackIfElement('#siteLockOverviewHeader','seen-sitelock');
    trackIfElement('#siteLockLite','created-sitelock-lite');
    trackIfElement('#siteLockFind','created-sitelock-find');
    trackIfElement('#siteLockFix','created-sitelock-fix');

    // RushFiles tracking
    trackIfElement('#rushFilesOverviewHeader','seen-rushfiles');
    trackIfElement('#rushFilesDriveCreatedHeader','created-rushfiles');
    trackIfElement('#rushFilesUpgraded','upgraded-rushfiles');

    // Email tracking
    trackIfElement('#createNewEmailAccount','seen-email');
    trackIfElement('#emailAccountCreated','created-email');

    // Gallery tracking
    trackIfElement('#frontpage_overview','seen-gallery');
    trackIfElement('#gallery-standalone-created','created-gallery');

    // Backup tracking
    trackIfElement('#backupSectionHeader','seen-backuprestore');
    trackIfElement('#trackBackupRestore','created-backuprestore');

    // MarketGoo tracking
    trackIfElement('#marketGooHeader','seen-marketgoo');
    trackIfElement('#intercomMarketGooFree','created-marketgoo-free');
    trackIfElement('#intercomMarketGooStart','created-marketgoo-start');
    trackIfElement('#intercomMarketGooEvo','created-marketgoo-evo');

    trackIfElement('.payment-buy #MARKETGOO_START', 'seen-marketgoo-start');
    trackIfElement('.payment-buy #MARKETGOO_EVO', 'seen-marketgoo-evo');
    trackOnClick('.marketgoo-overview #marketgoo-login-button', 'engage-marketgoo-dash');

    // OnePhoto tracking
    trackOnClick('#frontpageOnePhotoLink','seen-onephoto');

    // Orderflow tracking
    trackIfElement('.buy_customer', 'step1');
    trackIfElement('.buy_pay', 'step3');
    trackIfElement('.thanks', 'step4');


    // Other tracking
    trackIfElement('#referrals-customeradmin','seen-referral');
}

function trackOnClick(elementIdentifier, eventName) {
    if (window.Intercom) {
        var button = $(elementIdentifier);
        if (button.length) {
            button.on('click', function(e) {
                Intercom('trackEvent',eventName);
            });
        }
    }
}

function trackIfElement(elementIdentifier, eventName) {
    if (window.Intercom) {
        var elem = $(elementIdentifier);
        if (elem.length) {
            Intercom('trackEvent',eventName);
        }
    }
}

if (window.Intercom) {
    if(document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', setIntercomTracking);
    } else {
        setIntercomTracking();
    }
}


