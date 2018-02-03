import {totalCostOfDish} from "../model/dinnerModel";
import {View} from "./view";
import {createDishThumbnail} from "./dishThumbnail";

/** MenuView Object constructor
 *
 * This object represents the code for one specific view (in this case the Example view).
 *
 * It is responsible for:
 * - constructing the view (e.g. if you need to create some HTML elements procedurally)
 * - populating the view with the data
 * - updating the view when the data changes
 *
 * You should create a view Object like this for every view in your UI.
 *
 * @param {jQuery object} container - references the HTML parent element that contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */
export class DinnerOverviewView extends View {

    constructor(containerElement, model) {
        super(containerElement);

        this._dishList = containerElement.querySelector("#overview-dish-list");

        this._divider = document.createElement("li");
        this._divider.classList.add("vertical-divider");
        this._totals = undefined;

        this.update(model);
    }

    get locationHash() {
        return '#dinner-overview';
    }

    set dishList(newList) {
        this._dishList.innerHTML = "";
        newList.forEach(dish => {
            this._dishList.appendChild(createDishThumbnail({document: document, title:dish.name, imageURL:'images/' + dish.image, cost:totalCostOfDish(dish)}))
        });
        if (this._totals) {
            this._dishList.appendChild(this._divider);
            this._dishList.appendChild(this._totals);
        }
    }

    set totals(newTotals) {
        if (this._totals) {
            this._totals.remove();
        }
        this._totals = createDishThumbnail({document:document, title: "Total cost", cost: newTotals});
        this._dishList.appendChild(this._divider);
        this._dishList.appendChild(this._totals);
    }

    update(model) {
        this.dishList = model.getFullMenu();
        this.totals = model.getTotalMenuPrice();
    }

}
 