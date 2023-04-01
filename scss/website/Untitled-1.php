
<div class="book website book--mobile">


<div class="book__half book__info">

    <div class="info__mobile__switch --show-mobile">
        <p>Zusammenfassung</p>
        <img src="<?= get_template_directory_uri() ?>/img/elements/arrow_down_dark.svg">
    </div>

    <div class="info__product">
        <div>
            <h3 id="product__name"><?= $product_title ?>
            <?php if( $product_cat === "Kurs" || $product_cat === "Workshop" ) : ?>
                <br><b>für <span id="product__group"><?= $product_group ?></span></b></h3>
            <?php endif; ?>
            <?php if( $product_cat === "Geburtstag" ) : ?>
                    <span style="display:hidden;" id="product__group">KINDER</span>
            <?php endif; ?>
            <h6><?= $product_cat_description ?></h6>
            
        </div>
        <?= get_the_post_thumbnail( $product_id ) ?>
    </div>

    <div class="info__summary">
        <h6>Zusammenfassung</h6>

        <div class="summary__facts">

            <!-- Kurse -->
            <?php if( $product_cat === "Kurs" ) : ?>
                <div><span>Anzahl der Sitzungen</span><span><?= $lessons_count ?> Sitzungen</span></div>
                <div><span>Dauer einer Sitzung</span><span><?= $lessons_duration ?> Stunden</span></div>
                <div><span>Uhrzeit</span><span id="course__time"><?= $course_time ?></span></div>
                <div><span>Wochentag</span><span id="course__day"><?= $course_day ?></span></div>
            <?php endif; ?>

            <!-- Workshops -->
            <?php if( $product_cat === "Workshop" ) : ?>
                <div class="summary__duration"><span>Dauer</span><span class="value"><?= $workshop_duration ?> Stunden</span></div>
            <?php endif; ?>

            <!-- Geburtstage -->
            <?php if( $product_cat === "Geburtstag" ) : ?>
                <div class="summary__duration"><span>Dauer</span><span class="value"><?= $workshop_duration ?> Stunden</span></div>
            <?php endif; ?>

            <!-- Geburtstage -->
            <?php if( $product_cat === "Kunstevent" ) : ?>
                <div class="summary__duration"><span>Dauer</span><span class="value"><?= $workshop_duration ?> Stunden</span></div>
            <?php endif; ?>
            
        </div>


        <div class="summary__facts summary__dates">

            <!-- Kurse -->
            <?php if( $product_cat === "Kurs" ) : ?>
                <div><span>Starttermin</span><span id="summary__date">wählen...</span></div>
            <?php endif; ?>

            <!-- Workshops -->
            <?php if( $product_cat === "Workshop" ) : ?>
                <?php if( $_SESSION['double_date'] === "true" ) : ?>
                    <div><span>Termin 1</span><span id="summary__date">wählen...</span></div>
                    <div><span>Termin 2</span><span id="summary__date2">wählen...</span></div>
                <?php else: ?>
                    <div><span>Termin</span><span id="summary__date">wählen...</span></div>
                <?php endif; ?>
            <?php endif; ?>

            <!-- Geburtstage -->
            <?php if( $product_cat === "Geburtstag" ) : ?>
                    <div><span>Wunschtermin</span><span id="summary__date">wählen...</span></div>
            <?php endif; ?>

            <!-- Kunstevents -->
            <?php if( $product_cat === "Kunstevent" ) : ?>
                    <div><span>Wunschtermin</span><span id="summary__date">wählen...</span></div>
            <?php endif; ?>

        </div>
    </div>

    <div class="info__payment">
        <?php if( $product_cat === "Kunstevent" || $product_cat ==="Geburtstag" ) : ?>
            <div class="summary__facts">
                <div class="price__base">
                    <span>Grundpreis
                        <div class="tooltip">
                            <img src="<?= get_template_directory_uri() ?>/img/icons/icon_mini_info_<?= $color_name ?>">
                            <span></span>
                        </div>
                    </span>
                    <span class="value" data-value="<?= $price_base ?>"><?= $price_base ?>€</span>
                </div>
                <!-- <div class="price__extra" data-extra="onlyworkshop">
                    <span>Extra: Nur Workshop</span>
                    <span class="value --price-minus" data-value="-25">-25€</span>
                </div> -->
                <?php if( $product_cat === "Geburtstag" ) : ?>
                    <div class="price__person">
                        <span>
                            Materialkosten
                            <div class="tooltip">
                                <img src="<?= get_template_directory_uri() ?>/img/icons/icon_mini_info_<?= $color_name ?>">
                                <span></span>
                            </div>
                        </span>
                        <span class="value">Teilnehmerzahl wählen...</span>
                        <p class="material__perperson"><?= $price_per_person ?></p>
                    </div>
                <?php else: ?>
                    <div class="price__person">
                        <span>
                            Aufpreis nach Personen
                            <div class="tooltip">
                                <img src="<?= get_template_directory_uri() ?>/img/icons/icon_mini_info_<?= $color_name ?>">
                                <span></span>
                            </div>
                        </span>
                        <span class="value">Teilnehmerzahl wählen...</span>
                        <p class="material__perperson"><?= $price_per_person ?></p>
                    </div>
                <?php endif; ?>


                <template id="price__extra">
                    <div class="price__extra --extra">
                        <span class="title">---</span>
                        <span class="value">---</span>
                    </div>
                </template>

                
            </div>
        <?php endif; ?>

    
        <div class="payment__summary">
            <!-- <div class="book__coupon"></div> -->
            <div></div>
            <div class="book__price">
                <h6>Gesamtpreis</h6>
                <h2 id="product__price"><?= $price_base ?>€</h2>
            </div>
        </div>

        <div class="js__prices" style="display:none;">
            <span id="price__base"><?= $price_base ?></span>
            <span id="price__hour"><?= $price_per_hour ?></span>
            <span id="price__person"><?= $price_per_person ?></span>
        </div>
    </div>

</div>


<div class="process__nav">
    <span>Termin</span>
        <svg width="5.277" height="8.555" viewBox="0 0 5.277 8.555">
            <path data-name="Pfad 937" d="M-498.582,11194.315a1,1,0,0,1-.707-.293,1,1,0,0,1,0-1.414l2.57-2.57-2.57-2.57a1,1,0,0,1,0-1.414,1,1,0,0,1,1.414,0l3.277,3.277a1,1,0,0,1,0,1.414l-3.277,3.277A1,1,0,0,1-498.582,11194.315Z" transform="translate(499.582 -11185.761)" fill="#bfc6cc"/>
        </svg>
    <span>Informationen</span>
        <svg width="5.277" height="8.555" viewBox="0 0 5.277 8.555">
            <path data-name="Pfad 937" d="M-498.582,11194.315a1,1,0,0,1-.707-.293,1,1,0,0,1,0-1.414l2.57-2.57-2.57-2.57a1,1,0,0,1,0-1.414,1,1,0,0,1,1.414,0l3.277,3.277a1,1,0,0,1,0,1.414l-3.277,3.277A1,1,0,0,1-498.582,11194.315Z" transform="translate(499.582 -11185.761)" fill="#bfc6cc"/>
        </svg>
    <span class="<?php if( $product_cat !== "Geburtstag" ) { echo "--disabled"; } ?>">Extras</span>
        <svg width="5.277" height="8.555" viewBox="0 0 5.277 8.555">
            <path data-name="Pfad 937" d="M-498.582,11194.315a1,1,0,0,1-.707-.293,1,1,0,0,1,0-1.414l2.57-2.57-2.57-2.57a1,1,0,0,1,0-1.414,1,1,0,0,1,1.414,0l3.277,3.277a1,1,0,0,1,0,1.414l-3.277,3.277A1,1,0,0,1-498.582,11194.315Z" transform="translate(499.582 -11185.761)" fill="#bfc6cc"/>
        </svg>
    <span>Zahlung</span>
        <svg width="5.277" height="8.555" viewBox="0 0 5.277 8.555">
            <path data-name="Pfad 937" d="M-498.582,11194.315a1,1,0,0,1-.707-.293,1,1,0,0,1,0-1.414l2.57-2.57-2.57-2.57a1,1,0,0,1,0-1.414,1,1,0,0,1,1.414,0l3.277,3.277a1,1,0,0,1,0,1.414l-3.277,3.277A1,1,0,0,1-498.582,11194.315Z" transform="translate(499.582 -11185.761)" fill="#bfc6cc"/>
        </svg>
    <span>Überprüfung</span>
</div>


<div class="process__content">
    <?php
    $step = $_GET["step"];
    switch($step) :
        case "0":
            include("book/book_step_start.php");
            break;
        case "1":
            include("book/book_step_date.php");
            break;
        case "2":
            include("book/book_step_info.php");
            break;
        case "3":
            include("book/book_step_extras.php");
            break;
        case "4":
            include("book/book_step_pay.php");
            break;
        case "5":
            include("book/book_step_proof.php");
            break;
    endswitch;
    ?>
</div>


<div class="process__buttons">
    <?php if( $step === "1" ) : ?>
        <a class="back__button --color-<?= $color_name ?> step__prev">
            <span>Buchung verlassen</span>
        </a>
    <?php else: ?>
        <a class="back__button --color-<?= $color_name ?> step__prev">
            <span>Zurück</span>
        </a>
    <?php endif; ?>

    <a class="button --color-main step__next">
        <span>
            <?php if( $step !== "5" ) :
                echo "Nächster Schritt";
            else:
                if( $product_cat === "Kurs" || $product_cat === "Workshop" ) :
                    echo "Verbindlich Buchen";
                else :
                    echo "Unverbindlich Anfragen";
                endif;
            endif; ?>
        </span>
    </a>
    
</div>


</div>