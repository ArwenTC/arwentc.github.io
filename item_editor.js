
//const starting_slash = "/"
const command = "item replace entity "
var selector = "@s";
var slot = " weapon.mainhand "
var item_name = "minecraft:potato"
var count = "1";
var components = [];

// Generates an Item from the Collected Inputs
function generateItem() {
        
        // Collects basic info
        selector = $("#setting_0").val();
        slot = $("#setting_1").val();
        item_name = $("#setting_2").val();
        count = $("#setting_3").val();


        // Collects info and append values to the components list
        if (components.size > 0) {
                
                // Iterates through components
                for (var i = 0; i < components.size-1; i++) {
                        components.append();
                }
                //if (components.size)
        }


        // Collects the item type    
        var output_text = /*starting_slash +*/ command + selector + " " + slot + " with " + item_name + " " + count;
        // Places collected output into the output file
        $("#output_text").val(output_text);

}

// Copy function
function copyOutput() {
        
        // Gets the output text
        var output_text = $("#output_text").val()
        // Stores it in theclipboard
        navigator.clipboard.writeText(output_text);

}