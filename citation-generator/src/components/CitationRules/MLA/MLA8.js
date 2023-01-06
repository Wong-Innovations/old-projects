class MLA8Citation {
    constructor(authors, srcTitle, conTitle, contributors, version, number, publisher, pubDate, location) {
        this.authors = authors; // Array of objects with properties of (fname, lname, middleInitial, suffix)
        this.srcTitle = srcTitle; // Title of source
        this.conTitle = conTitle; // TItle of container
        this.contributors = contributors;
        this.version = version;
        this.number = number;
        this.publisher = publisher;
        this.pubDate = pubDate; // JS date object
        this.location = location;
        this.HTMLcitation = this.generateCitation();
    }

    generateCitation() {
        let HTMLcitation = "<p>";

        // Concats first author
        HTMLcitation += this.authors[0].lname + ", ";
        HTMLcitation += this.authors[0].fname;
        if (this.authors[0].mname) {
            HTMLcitation += " " + this.authors[0].mname;
            if (this.authors[0].mname.length === 1) {
                HTMLcitation += ". "; // Checks for just an initial
            }
        }
        if (this.authors[0].suffix) {
            HTMLcitation += ", " + this.authors[0].suffix + ".";
        }
        // Checks the number of authors / contributors
        if (this.authors.length === 2) {
            HTMLcitation += ", and ";
            HTMLcitation += this.authors[1].fname + " ";
            if (this.authors[1].mname) {
                HTMLcitation += this.authors[1].mname;
                if (this.authors[1].mname.length === 1) {
                    HTMLcitation += ". "; // Checks for just an initial
                }
            }
            HTMLcitation += this.authors[1].lname;
            if (this.authors[1].suffix) {
                HTMLcitation += " " + this.authors[1].suffix + ".";
            }
        }
        else if (this.authors.length > 2) {
            HTMLcitation += ", et al. "
        }

        // Source title (italicized)
        if (!this.conTitle) {
            HTMLcitation += "<i>";
            HTMLcitation += this.srcTitle;
            HTMLcitation += "</i>. ";
        }
        else {
            HTMLcitation += `"${this.srcTitle}" `;
            HTMLcitation += "<i>";
            HTMLcitation += this.conTitle;
            HTMLcitation += "</i>, ";
        }

        // Other contributors
        if (this.contributors) {
            for (const contrib in this.contributors) {
                HTMLcitation += ` ${contrib.contrib} by `;
                HTMLcitation += contrib.fname + " ";
                if (contrib.mname) {
                    HTMLcitation += contrib.mname;
                    if (contrib.mname.length() === 1) {
                        HTMLcitation += "."; // Checks for just an initial
                    }
                }
                HTMLcitation += this.authors[1].lname;
                if (this.authors[1].suffix) {
                    HTMLcitation += " " + this.authors[1].suffix + ".";
                }
            }
        }

        /* The following may need conditional ordering... */

        // Version
        if (this.version) {
            HTMLcitation += `${this.version}, `;
        }

        // Number
        if (this.number) {
            HTMLcitation += `${this.number}, `;
        }

        // Publisher
        if (this.publisher) {
            HTMLcitation += `${this.publisher}, `;
        }

        // Date
        if (this.pubDate) {
            let date = this.pubDate.split(" ");
            HTMLcitation += `${date[2]} ${date[1]} ${date[3]}. `;
        }

        // Location
        if (this.location) {
            HTMLcitation += `${this.location}. `;
        }

        HTMLcitation += "</p>";
        return HTMLcitation;
    }
}

export default MLA8Citation;

/*~~~~~~~~~~~~~~~Note~~~~~~~~~~~~~~~~*/
/*
authors = [
    {
        fname: "",
        mname: "",
        lname: "",
        suffix: ""
    },
    ...
]
contributors = [
    {
        contrib: "Edited",
        fname: "",
        mname: "",
        lname: "",
        suffix: ""
    }
]
*/