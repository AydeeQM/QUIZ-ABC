const app = {

    setting: {
        x: 0,
        y: undefined,
        g: undefined,
        p: undefined,
        count: undefined,
        current: undefined,
        percent: undefined,
        slideCount: undefined,
        slideWidth: undefined,
        slideHeight: undefined,
        sliderUlWidth: undefined

    },

    init: function () {
        $('.mm-prev-btn').hide();
        app.setting.count = $('.mm-survey-page').length;
        app.start();
        app.getCurrentSlide();
        app.goToNext();
        app.goToPrev();
        app.getCount();
        app.buildStatus();
        app.deliverStatus();
        app.submitData();
        app.goBack();

        $('.mm-survey-q li input').each(function () {

            let item;
            item = $(this);

            $(item).on('click', function () {
                if ($('input:checked').length > 0) {
                    // console.log(item.val());
                    $('label').parent().removeClass('active');
                    item.closest('li').addClass('active');
                }
            });

        });

        app.setting.percent = (app.setting.x / app.setting.count) * 100;
        $('.mm-survey-progress-bar').css({
            'width': app.setting.percent + '%'
        });
        
        //$('#num-progress').append('<span>' + app.setting.x + ' of 5 answered </span>');

        app.setting.slideCount = $('#slider ul li').length;
        app.setting.slideWidth = $('#slider ul li').width();
        app.setting.slideHeight = $('#slider ul li').height();
        app.setting.sliderUlWidth = app.setting.slideCount * app.setting.slideWidth;

        $('#slider').css({
            width: app.setting.slideWidth,
            height: app.setting.slideHeight
        });

        $('#slider ul').css({
            width: app.setting.sliderUlWidth,
            marginLeft: -app.setting.slideWidth
        });

        $('#slider ul li:last-child').prependTo('#slider ul');
    },

    start: function () {
        $('.mm-survey-container .mm-survey-page').each(function () {
            let item;
            let page;

            item = $(this);
            page = item.data('page');

            item.addClass('mm-page-' + page);
        });
    },

    getCount: function () {
        return app.setting.count;
    },

    goToNext: function () {

        $('.mm-next-btn').on('click', function () {
            app.goToSlide(app.setting.x);
            app.getCount();
            app.setting.current = app.setting.x + 1;
            app.setting.g = app.setting.current / app.setting.count;
            app.buildProgress(app.setting.g);
            app.setting.y = (app.setting.count + 1);
            app.getButtons();
            $('.mm-survey-page').removeClass('active');
            $('.mm-page-' + app.setting.current).addClass('active');
            app.getCurrentSlide();
            app.checkStatus();
            if ($('.mm-page-' + app.setting.count).hasClass('active')) {
                if ($('.mm-page-' + app.setting.count).hasClass('pass')) {
                    $('.mm-finish-btn').addClass('active');
                } else {
                    $('.mm-page-' + app.setting.count + ' .mm-survery-content .mm-survey-item').on('click', function () {
                        $('.mm-finish-btn').addClass('active');
                    });
                }
            } else {
                $('.mm-finish-btn').removeClass('active');
                if ($('.mm-page-' + app.setting.current).hasClass('pass')) {
                    $('.mm-survey-container').addClass('good');
                    $('.mm-survey').addClass('okay');
                } else {
                    $('.mm-survey-container').removeClass('good');
                    $('.mm-survey').removeClass('okay');
                }
            }
            app.buttonConfig();
            app.moveRight();

            //$('#num-progress').append('<span>' + app.setting.current + ' of 5 answered </span>');
        });
    },

    goToPrev: function () {

        $('.mm-prev-btn').on('click', function () {
            app.goToSlide(app.setting.x);
            app.getCount();
            app.setting.current = (app.setting.x - 1);
            app.setting.g = app.setting.current / app.setting.count;
            app.buildProgress(app.setting.g);
            app.setting.y = app.setting.count;
            app.getButtons();
            $('.mm-survey-page').removeClass('active');
            $('.mm-page-' + app.setting.current).addClass('active');
            app.getCurrentSlide();
            app.checkStatus();
            $('.mm-finish-btn').removeClass('active');
            if ($('.mm-page-' + app.setting.current).hasClass('pass')) {
                $('.mm-survey-container').addClass('good');
                $('.mm-survey').addClass('okay');
            } else {
                $('.mm-survey-container').removeClass('good');
                $('.mm-survey').removeClass('okay');
            }
            app.buttonConfig();
            app.moveLeft();
        });

    },

    buildProgress: function (g) {
        app.setting.g = app.setting.current / app.setting.count;
        if (app.setting.g > 1) {
            app.setting.g = app.setting.g - 1;
        } else if (app.setting.g === 0) {
            app.setting.g = 1;
        }
        app.setting.g = app.setting.g * 100;
        $('.mm-survey-progress-bar').css({
            'width': app.setting.g + '%'
        });
    },

    goToSlide: function (x) {

        return app.setting.x;
    },

    getCurrentSlide: function () {

        $('.mm-survey-page').each(function () {

            let item;

            item = $(this);

            if ($(item).hasClass('active')) {
                app.setting.x = item.data('page');
            }

            return app.setting.x;

        });

    },

    getButtons: function () {

        if (app.setting.current === 0) {
            app.setting.y = app.setting.count;
            app.setting.current = app.setting.y;
        }
        if (app.setting.current === app.setting.count) {
            $('.mm-next-btn').hide();
        } else if (app.setting.current === 1) {
            $('.mm-prev-btn').hide();
        } else {
            $('.mm-next-btn').show();
            $('.mm-prev-btn').show();
        }

    },

    checkStatus: function () {
        $('.mm-survery-content .mm-survey-item').on('click', function () {
            let item;
            item = $(this);
            item.closest('.mm-survey-page').addClass('pass');
        });
    },

    buildStatus: function () {
        $('.mm-survery-content .mm-survey-item').on('click', function () {
            let item;
            item = $(this);
            item.addClass('bingo');
            item.closest('.mm-survey-page').addClass('pass');
            $('.mm-survey-container').addClass('good');
        });
    },

    deliverStatus: function () {
        $('.mm-survey-item').on('click', function () {
            if ($('.mm-survey-container').hasClass('good')) {
                $('.mm-survey').addClass('okay');
            } else {
                $('.mm-survey').removeClass('okay');
            }
            app.buttonConfig();
        });
    },

    lastPage: function () {
        if ($('.mm-next-btn').hasClass('cool')) {
            alert('cool');
        }
    },

    buttonConfig: function () {
        if ($('.mm-survey').hasClass('okay')) {
            $('.mm-next-btn button').prop('disabled', false);
        } else {
            $('.mm-next-btn button').prop('disabled', true);
        }
    },

    submitData: function () {
        $('.mm-finish-btn').on('click', function () {
            app.collectData();
            $('.mm-survey-bottom').slideUp();
            $('.mm-survey-results').slideDown();
        });
    },

    collectData: function () {

        let map = {};
        let ax = ['0', 'klm', 'shangai', '337.60', '590', '2617'];
        let answer = '';
        let total = 0;
        let ttl = 0;
        let g;
        let c = 0;

        $('.mm-survey-item input:checked').each(function (index, val) {
            let item;
            let data;
            let name;
            let n;

            item = $(this);
            data = item.val();
            name = item.data('item');
            n = parseInt(data);
            total += n;

            map[name] = data;

        });

        $('.mm-survey-results-container .mm-survey-results-list').html('');

        for (i = 1; i <= app.setting.count; i++) {

            let t = {};
            let m = {};
            answer += map[i] + '<br>';

            if (map[i] === ax[i]) {
                g = map[i];
                app.setting.p = 'correct';
                c = 1;
            } else {
                g = map[i];
                app.setting.p = 'incorrect';
                c = 0;
            }

            $('.mm-survey-results-list').append('<li class="mm-survey-results-item ' + app.setting.p + '"><span class="mm-item-number">' + i + '</span><span class="mm-item-info">' + g + ' - ' + app.setting.p + '</span></li>');

            m[i] = c;
            ttl += m[i];

        }

        let results;
        results = ((ttl / app.setting.count) * 100).toFixed(0);

        $('.mm-survey-results-score').html(results + '%');

    },

    goBack: function () {
        $('.mm-back-btn').on('click', function () {
            $('.mm-survey-bottom').slideDown();
            $('.mm-survey-results').slideUp();
        });
    },
    
    moveLeft: function () {
        $('#slider ul').animate({
            left: +app.setting.slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    },

    moveRight: function () {
        $('#slider ul').animate({
            left: -app.setting.slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    }

}

$(document).ready(function () {
    app.init();
});
