//Second Attempt with linked lists
class Scale {
    constructor(x, y, axis, direction) {
        this.x = x;
        this.y = y;
        this.pos = [this.x, this.y]
        this.axis = axis;
        this.direction = direction;
        this.prev = null
        

    }

    change_direction(axis, direction) {

        this.axis = axis;
        this.direction = direction;
    }

    move() {
        if (this.prev) {

            this.pos = this.prev.pos.slice(0);
            return 0;

        }

        this.pos[this.axis] += this.direction * 20
        return this.pos;
    }

    render() {
        fill(255)
        rect(this.pos[0], this.pos[1], 20, 20);
    }
}

class Snake {
    constructor(x, y) {
        this.tail = new Scale(x, y, 0, 1);
        this.headPos = this.tail.pos
        this.axis = this.tail.axis;
        this.len = 1;
    }

    run() {

        let current_scale = this.tail;
        while (current_scale) {
            if (!current_scale.prev) {
                this.headPos = current_scale.move();
            }
            else {
                current_scale.move();

            }
            current_scale = current_scale.prev;
        }

        current_scale = this.tail;
        while (current_scale) {
            if (current_scale.prev) {
                if (current_scale.pos[0] === this.headPos[0] && current_scale.pos[1] === this.headPos[1]) {
                    console.log('you lose')
                    return 1;
                }
            }
            current_scale = current_scale.prev;
        }


        

        return 0;

    }

    change_direction(axis, direction) {

        if (axis != this.axis) {
            this.axis = axis;
            let current_scale = this.tail;
            while (current_scale) {

                current_scale.change_direction(axis, direction);
                current_scale = current_scale.prev;
            }
        }

    }

    grow() {
        //Problem is here
        let prev = this.tail;
        this.tail = new Scale(prev.pos[0] - 20 * prev.direction * (1 - prev.axis), prev.pos[1] - 20 * prev.direction * !(1 - prev.axis), prev.axis, prev.direction)
        this.tail.prev = prev;
        this.len += 1;

    }

    render() {
        let current_scale = this.tail
        while (current_scale) {
            current_scale.render()
            current_scale = current_scale.prev
        }
    }
}