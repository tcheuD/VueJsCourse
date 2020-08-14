<template>
    <div
        :class="{
            [$style.component]: true,
            [$style.collapsed]: collapsed,
            'p-3': true,
            'mb-5': true
        }"
    >
        <div v-if="!collapsed">
            <h5 class="text-center">
                Categories
            </h5>
            <ul class="nav flex-column mb4">
                <li class="nav-item">
                    <a
                        class="nav-link"
                        href="/"
                    >All Products</a>
                </li>
                <li
                    v-for="(category, index) in categories"
                    :key="index"
                    class="nav-item"
                >
                    <a
                        class="nav-link"
                        :href="category.link"
                    >
                        {{ category.name }}
                    </a>
                </li>
            </ul>

            <hr>
        </div>

        <div class="d-flex justify-content-end">
            <button
                class="btn btn-secondary btn-sm"
                @click="toggleCollapled"
                v-text="collapsed ? '>>' : '<< Collapse'"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    data() {
        return {
            collapsed: false,
            categories: [
                {
                    name: 'Dot Matrix Printers',
                    link: '#',
                },
                {
                    name: 'Iomega Zip Drives',
                    link: '#',
                },
            ],
        };
    },
    methods: {
        toggleCollapled() {
            this.collapsed = !this.collapsed;
        },
    },
};
</script>

<style lang="scss" module>
    @import '~styles/components/light-component';

    .component {
        @include light-component;

      &.collapsed {
        width: 70px;
      }

        ul {
            li a:hover {
                background: $blue-component-link-hover;
            }
        }
    }
</style>
